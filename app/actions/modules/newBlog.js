import {fetchPost} from 'widgets';

const NEWBLOG = "NEWBLOG";
const NEWBLOGING = "NEWBLOGING";

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case NEWBLOGING:
      return {loading:true};
    case NEWBLOG:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resNewBlog(json) {
  return {
    type: NEWBLOG,
    data: json
  }
}
function resNewBloging() {
  return {
    type: NEWBLOGING
  }
}
export function reqNewBlog(para) {
  return dispatch => {
    dispatch(resNewBloging())
    fetchPost('newblog', para).then(res=>res.json()).then(json=>dispatch(resNewBlog(json)))
  }
}
