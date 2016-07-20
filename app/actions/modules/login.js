import {fetchPost} from 'widgets';

const LOGIN = "LOGIN";
const LOGINING = "LOGINING";

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case LOGINING:
      return {loading:true};
    case LOGIN:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resLogin(json) {
  window.localStorage['jftoken'] = json.token;
  return {
    type: LOGIN,
    data: json
  }
}
function resLogining() {
  return {
    type: LOGINING
  }
}
export function reqLogin(para) {
  return dispatch => {
    dispatch(resLogining())
    fetchPost('login', para).then(res=>res.json()).then(json=>dispatch(resLogin(json)))
  }
}
