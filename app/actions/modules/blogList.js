import {fetchGet} from 'widgets';

const BLOGLIST = "BLOGLIST";
const BLOGLISTING = "BLOGLISTING";

const initialState = {
  data: [],
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case BLOGLISTING:
      return {data:[],loading:true}
    case BLOGLIST:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resBlogList(json) {
  return {
    type: BLOGLIST,
    data: json
  }
}
function resBlogListing() {
  return {
    type: BLOGLISTING
  }
}
export function reqBlogList() {
  return dispatch => {
    dispatch(resBlogListing())
    fetchGet('bloglist').then(res=>res.json()).then(json=>dispatch(resBlogList(json)))
  }
}
