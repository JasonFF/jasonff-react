import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Hello,
    Home,
    BlogDetail,
    Starter,
    AboutMe
  } from 'containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="/hello" component={Hello}></Route>
      <Route path="/notebook/:id" component={Hello}></Route>
      <Route path="/blog/:id" component={BlogDetail}></Route>
      <Route path="aboutme" component={AboutMe}></Route>
    </Route>
  );
};
