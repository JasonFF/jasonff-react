import {fetchGet} from 'widgets';

const MYBLOGLIST = "MYBLOGLIST";
const MYBLOGLISTING = "MYBLOGLISTING";

const initialState = {
  data: [],
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case MYBLOGLISTING:
      return {data:[],loading:true}
    case MYBLOGLIST:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resMyBlogList(json) {
  return {
    type: MYBLOGLIST,
    data: json
  }
}
function resMyBlogListing() {
  return {
    type: MYBLOGLISTING
  }
}
export function reqBlogList(para) {
  return dispatch => {
    dispatch(resMyBlogListing())
    fetchGet('mybloglist',para).then(res=>res.json()).then(json=>dispatch(resMyBlogList(json)))
  }
}
