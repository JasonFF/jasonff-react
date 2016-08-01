import {fetchPost, fetchGet} from 'widgets';

const UPDATEBLOG = "UPDATEBLOG";
const UPDATEBLOGING = "UPDATEBLOGING";

const initialState = {
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case UPDATEBLOGING:
      return {loading:true};
    case UPDATEBLOG:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resUpdateBlog(json) {
  return {
    type: UPDATEBLOG,
    data: json
  }
}
function resUpdateBloging() {
  return {
    type: UPDATEBLOGING
  }
}
export function reqUpdateBlog(para) {
  return dispatch => {
    dispatch(resUpdateBloging())
    fetchPost('updateblog', para).then(res=>res.json()).then(json=>dispatch(resUpdateBlog(json)))
  }
}
