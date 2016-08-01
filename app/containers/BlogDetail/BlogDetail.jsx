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
    const body = document.getElementsByTagName('body')[0];
    const scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      if (/(uyan)|(jiathis)|(fugetech)|(bdimg)/ig.test(scripts[i].src)) {
        scripts[i].parentNode.removeChild(scripts[i])
      }
    }
    let newScript = document.createElement('script');
    newScript.src = 'http://v2.uyan.cc/code/uyan.js?uid=2060453';
    newScript.type = 'text/javascript';
    newScript.id = 'uyan_script';
    document.getElementsByTagName('body')[0].appendChild(newScript)
    if (window.UYAN_L) {
      window.UYAN_L.init()
    }
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
