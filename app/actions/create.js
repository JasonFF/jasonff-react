import { createStore as _createStore, applyMiddleware, compose } from 'redux'; // compose is used to enhance a store and it is mainly for redux-devtools
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [reduxRouterMiddleware, thunk];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools'); // persist:保留
    const DevTools = require('../containers/DevTools/DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)) // what's debug_session used for?
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducer = require('./reducer');
  const store = finalCreateStore(reducer, data);

  // 整个store的创建，本质上还是applyMiddeleWare()(createStore)
  // 加了两个中间件，第一个createMiddleware来自于本地写的中间件clientMiddleware，它用于包装client的方法。对于请求返回来的状态进行管理。
  // 第二个，routeMiddleware，用于history，主要是用来同步router和history，正如react-router-redux的 github上写的，
  // This library is not necessary for using Redux together with React Router.
  // You can use the two together just fine without any additional libraries.
  // It is useful if you care about recording, persisting, and replaying user actions, using time travel.

  // 这里还进行了方便开发的插件的添加

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer'));
    });
  }

  return store;
}
