import {fetchGet} from 'widgets';

const BLOGDETAIL = "BLOGDETAIL";
const BLOGDETAILING = "BLOGDETAILING";

const initialState = {
  data:{
    title:'',
    content:''
  },
  loading: false
}

export default function reducer(state = initialState, action = {} ) {
  switch (action.type) {
    case BLOGDETAILING:
      return {data:[],loading:true}
    case BLOGDETAIL:
      return Object.assign({},action.data,{loading:false});
    default:
      return state;
  }
}
function resBlogDetail(json) {
  return {
    type: BLOGDETAIL,
    data: json
  }
}
function resBlogDetailing() {
  return {
    type: BLOGDETAILING
  }
}
export function reqBlogDetail(para) {
  return dispatch => {
    dispatch(resBlogDetailing())
    fetchGet('blogdetail',para).then(res=>res.json()).then(json=>dispatch(resBlogDetail(json)))
  }
}
