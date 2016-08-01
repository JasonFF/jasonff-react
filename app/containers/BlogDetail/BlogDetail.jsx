import React,{Component} from 'react';
import {connect} from 'react-redux';
import {reqBlogDetail} from 'actions';
import {Col} from 'antd';
import {Navbar} from 'components'

export default class BlogDetail extends Component {
  componentWillMount() {
    console.log(this.props.params.id)
    this.props.reqBlogDetail({blogId:this.props.params.id})
  }
  render() {
    const style = require('./BlogDetail.scss');
    const {title,content} = this.props.blogDetail.data;
    return (
      <div>
        <Navbar background="-"/>
        <Col sm={24} md={{span:16,offset:6}}>
          <h1 className={style.title}>{title||''}</h1>
          <div className='markdown-body' dangerouslySetInnerHTML={{__html:content}}></div>
          <div id="uyan_frame"></div>
        </Col>
      </div>
    )
  }
}

export default connect(state=>({blogDetail:state.blogDetail}),{reqBlogDetail})(BlogDetail)
