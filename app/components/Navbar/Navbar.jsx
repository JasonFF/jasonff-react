import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {Col, Icon} from 'antd';

@connect(state=>({user:state.user}),
{})
export default class Navbar extends Component {
  render() {
    const style = require('./Navbar.scss');
    const {background} = this.props;
    return (
      <Col xs={0} sm={7} style={{backgroundImage:`url(${background?background:'/static/image/bg-3.jpg'})`}} className={style.nav}>
        <div className={style.navbar}>
          <Link to="/" className={style.logo}><img src="/static/image/jf-white.png" alt=""/></Link>
          <ul className={style.navlist}>
            <Link to="/"><Icon type="home"/></Link>
            <Link to="/index"><Icon type="book"/></Link>
            <Link to="/newblog"><Icon type="edit"/></Link>
            <Link to="/login"><Icon type="user"/></Link>
          </ul>
        </div>
      </Col>
    )
  }
}
