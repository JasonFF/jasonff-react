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
  // const _store = Object.assign({},store);
  // _store.getState = function() {
  //     const __s = store.getState();
  //     const truck = __s.truck;
  //     const __k = Object.keys(truck);
  //     __k.forEach((item,i)=>{
  //         __s[item] = truck[item]
  //     })
  //     console.log(__s)
  //     return __s
  // }
  // _store.liftedStore.getState = function() {
  //     const __s = store.getState();
  //     const truck = __s.truck;
  //     const __k = Object.keys(truck);
  //     __k.forEach((item,i)=>{
  //         __s[item] = truck[item]
  //     })
  //     console.log(__s)
  //     return __s
  // }
  // console.log(store.liftedStore)
  return store;
}
