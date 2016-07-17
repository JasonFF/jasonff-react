import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // 在store里记录了路由情况

// import {reducer as form} from 'redux-form';// 用来控制页面表单的利器
import user from './modules/login';
import signup from './modules/signup';

export default combineReducers({
  routing: routerReducer,
  user: user,
  signup: signup
});
