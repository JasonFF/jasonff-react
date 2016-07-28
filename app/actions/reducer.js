import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // 在store里记录了路由情况

// import {reducer as form} from 'redux-form';// 用来控制页面表单的利器
import user from './modules/login';
import signup from './modules/signup';
import newBlog from './modules/newBlog';
import blogList from './modules/blogList';
import checkLogin from './modules/checkLogin';
import blogDetail from './modules/blogDetail';

export default combineReducers({
  routing: routerReducer,
  user: user,
  signup: signup,
  newBlog: newBlog,
  blogList: blogList,
  checkLogin: checkLogin,
  blogDetail: blogDetail
});
