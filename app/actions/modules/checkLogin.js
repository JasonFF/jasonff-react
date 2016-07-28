const CHECKLOGIN = "CHECKLOGIN";
const INITLOGIN = "INITLOGIN";

const initialState = {
  status:123
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case INITLOGIN:
      return Object.assign({},state,{status:123});
    case CHECKLOGIN:
      return Object.assign({},action.data);
    default:
      return state;
  }
}

function resNeedLogin() {
  return {
    type: INITLOGIN
  }
}
export function initLogin() {
  return dispatch => {
    dispatch(resNeedLogin())
  }
}
