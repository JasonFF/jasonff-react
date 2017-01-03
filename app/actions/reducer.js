import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // 在store里记录了路由情况
import truck from './modules/truck';

export default combineReducers({
  routing: routerReducer,
  truck
});
