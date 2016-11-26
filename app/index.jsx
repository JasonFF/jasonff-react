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

function handleUpdate() {
    let {action} = this.state.location;
    if (action === 'PUSH'|| action === 'REPLACE') {
        if (/admin/.test(this.state.location.pathname)) {
            return false
        }
        window.scrollTo(0, 0);
    }
}


render(
    <Provider store={store} key='provider'>
        <Router onUpdate={handleUpdate} history={browserHistory}>
            {routes(store)}
        </Router>
    </Provider>,
    dest
)
