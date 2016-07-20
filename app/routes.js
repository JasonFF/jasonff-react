import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Login,
    Signup,
    UserHome,
    InsidePage
  } from 'containers';

const localStorage = localStorage?localStorage:{};

export default (store) => {
  function needLogin(nextState, replace) {
    let {jftoken} = window.localStorage;
    if (jftoken) {
      store.dispatch({
        type: 'LOGIN',
        data: {
          token: jftoken
        }
      })
    } else {
      replace('/login')
    }
  }
  return (
    <Route path="/" component={App}>
      <Route onEnter={needLogin}>
        <Route path='/home' component={UserHome}></Route>
      </Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/signup' component={Signup}></Route>
    </Route>
  );
};
