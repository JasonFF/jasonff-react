import React,{Component} from 'react';
import {connect} from 'react-redux';
import {reqBlogDetail} from 'actions';
import {Col} from 'antd';
import {Navbar} from 'components'

export default class BlogDetail extends Component {
  componentWillMount() {
    this.props.reqBlogDetail({blogId:this.props.params.id})
  }
  componentDidMount() {
    const uyan_script = document.getElementById('uyan_script');
    let newScript = document.createElement('script');
    newScript.src = uyan_script.src;
    newScript.type = 'text/javascript';
    newScript.id = 'uyan_newscript';
    document.getElementsByTagName('body')[0].appendChild(newScript)
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
          <script id="uyan_script" type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=2060453"></script>
        </Col>
      </div>
    )
  }
}

export default connect(state=>({blogDetail:state.blogDetail}),{reqBlogDetail})(BlogDetail)
