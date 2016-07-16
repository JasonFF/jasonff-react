import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
// import favicon from 'serve-favicon';
import compression from 'compression';//used to compress response bodies
// import httpProxy from 'http-proxy';//http代理
import path from 'path';
import createStore from './actions/create';
// import ApiClient from './helpers/ApiClient';
import Html from './widgets/Html';
// import PrettyError from 'pretty-error';
import http from 'http';

import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from './routes';
//

// const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
// const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
// app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'dist/app/')));
app.use(Express.static(path.join(__dirname, '..')));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  // const client = new ApiClient(req);// 将req去请求，返回的是请求结果。client本身是个Promise对象实例，里面包含了几个方法。用于请求数据。
  const memoryHistory = createHistory(req.originalUrl);// 跟地址栏上的url就没有关系了，互不影响了，history 只有被createMemoryHistory()的时候才被更新.
  const store = createStore(memoryHistory);
  // 将用于请求的Promise实例对象放上了，这意味着可以在store中使用client这个对象中的方法。
  // 这里的store 加入了中间件，对history加了react-router-redux的中间件，对于client对象加入了一个中间件用于处理返回来的数据。

  const history = syncHistoryWithStore(memoryHistory, store);// enhance the history，为了将history跟store给同步起来

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }
  //req.originalUrl => '/search?q=something'
  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const component = (
        <Provider store={store} key="provider">
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.status(200);

      global.navigator = {userAgent: req.headers['user-agent']};

      res.send('<!doctype html>\n' +
        ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
