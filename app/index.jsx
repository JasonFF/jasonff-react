import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import createStore from './actions/create'
import { Provider } from 'react-redux';

const store = createStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const dest = document.getElementById('main');

render(
    <Provider store={store} key='provider'>
        <Router history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>,
    dest
)
