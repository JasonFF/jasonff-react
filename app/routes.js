import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Login,
    Signup,
    UserHome,
    Home,
    Index,
    NewBlog,
    BlogDetail,
    NeedLogin
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
      <IndexRoute component={Home}></IndexRoute>
      <Route onEnter={needLogin} component={NeedLogin}>
        <Route path='home' component={UserHome}></Route>
        <Route path='newblog' component={NewBlog}></Route>
      </Route>
      <Route path='index' component={Index}></Route>
      <Route path='blog/:id' component={BlogDetail}></Route>
      <Route path='login' component={Login}></Route>
      <Route path='signup' component={Signup}></Route>
    </Route>
  );
};
