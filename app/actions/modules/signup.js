import {fetchPost} from 'widgets';

const SIGNUP = "SIGNUP";
const SIGNUPING = "SIGNUPING";

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case SIGNUPING:
      return {loading:true};
    case SIGNUP:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resSignup(json) {
  return {
    type: SIGNUP,
    data: json
  }
}
function resSignuping() {
  return {
    type: SIGNUPING
  }
}
export function reqSignup(para) {
  return dispatch => {
    dispatch(resSignuping())
    console.log(para)
    fetchPost('signup', para).then(res=>res.json()).then(json=>dispatch(resSignup(json)))
  }
}
