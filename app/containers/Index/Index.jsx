import React,{Component} from 'react';
import {Navbar} from 'components';
import {connect} from 'react-redux';
import {action} from 'actions';
import {Row, Col} from 'antd';
import {Link} from "react-router";
import moment from 'moment'

class Index extends Component {
  componentWillMount() {
    
  }
  render() {
    const style = require('./Index.scss');
    const list = this.props.blogList.data;
    return (
      <main className={`${style.container} animated fadeIn`}>
        <Navbar/>
        <Col className={style.mainBox} xs={24} sm={{span:15, offset:7}}>
          {
            list.map((data,index)=><div className={style.blogBox} key={'index'+index}>
              <Link className={style.blogTitle} to={'/blog/'+data._id}>{data.title}</Link>
              <p className={style.time}>{moment(data.createTime).format("YYYY-MM-DD HH:mm")}</p>
            </div>)
          }
        </Col>
      </main>
    )
  }
}

export default connect(state=>({truck:state.truck}),{action})(Index)
