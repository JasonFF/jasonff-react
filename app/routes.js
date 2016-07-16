import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Page1,
    Login,
    Statistics,
    InsidePage
  } from 'containers';

const localStorage = localStorage?localStorage:{};

export default (store) => {
  function needLogin(nextState, replace) {
    let {start} = localStorage;
    if (start) {
      let startTime = start;
      let now = new Date().getTime();
      let gotime = now - startTime;
      if (gotime > 10*60*1000) {
        localStorage.sessionUser = '';
        localStorage.start = ''
      }
    }
    let {user} = store.getState();
    let sessionUser = localStorage.sessionUser&&JSON.parse(localStorage.sessionUser);
    if (user && user.data && user.data.token) {
      localStorage['sessionUser'] = JSON.stringify(user);
      localStorage['start'] = new Date().getTime();
    } else {
      if (sessionUser && sessionUser.data && sessionUser.data.token ) {
        store.dispatch({
          type: 'LOGIN',
          data: sessionUser
        })
      } else {
        replace('/login')
      }
    }
  }
  return (
    <Route path="/" component={App}>
      <Route onEnter={needLogin} component={InsidePage}>
        <Route path='/statistics' component={Statistics}></Route>
      </Route>
      <Route path='/page1' component={Page1}></Route>
      <Route path='/login' component={Login}></Route>
    </Route>
  );
};
