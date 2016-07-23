import React,{Component} from 'react';
import {Navbar} from 'components';
import {connect} from 'react-redux';
import {reqBlogList} from 'actions';
import {Row, Col} from 'antd';
import {Link} from "react-router";

export default class Index extends Component {
  componentWillMount() {
    this.props.reqBlogList()
  }
  render() {
    const style = require('./Index.scss');
    const list = this.props.blogList.data;
    return (
      <main className={`${style.container} animated fadeIn`}>
        <Navbar></Navbar>
        <Col xs={24} sm={{span:20, offset:2}}>
          <div className={style.mailList}>
            {
              list.map((data,index)=><div key={'index'+index}>
                <Link className={style.blogtitle} to={'/blog/'+data._id}>{data.title}</Link>
                <p>{data.content}</p>
              </div>)
            }
          </div>
        </Col>
      </main>
    )
  }
}

export default connect(state=>({blogList:state.blogList}),{reqBlogList})(Index)
