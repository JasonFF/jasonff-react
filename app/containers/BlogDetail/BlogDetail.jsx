import React,{Component} from 'react';
import {connect} from 'react-redux';
import {reqBlogDetail} from 'actions';

@connect(state=>({blogDetail:state.blogDetail}),{reqBlogDetail})
export default class BlogDetail extends Component {
  componentWillMount() {
    console.log(this.props.params.id)
    this.props.reqBlogDetail({blogId:this.props.params.id})
  }
  render() {
    const style = require('./BlogDetail.scss');
    const {title,content} = this.props.blogDetail.data;
    console.log(content)
    return (
      <div>
        <h1>{title||''}</h1>
        <div className='markdown' dangerouslySetInnerHTML={{__html:content}}></div>
      </div>
    )
  }
}
