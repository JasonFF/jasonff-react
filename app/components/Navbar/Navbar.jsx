import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'
import {Col, Icon} from 'antd';

@connect(state=>({user:state.user}),
{})
export default class Navbar extends Component {
  componentWillMount() {
    this.setState({
      bg: false
    })
  }
  changeBG() {
    this.setState({
      bg: !this.state.bg
    })
  }
  render() {
    const style = require('./Navbar.scss');
    const {background} = this.props;
    const {bg} = this.state;
    return (
      <Col xs={0} sm={!bg?24:7} style={{backgroundImage:`url(${background?background:'/static/image/bg-3.jpg'})`}} className={style.nav}>
        <div className={style.navbar}>
          <Link to="/" className={style.logo}><img src="/static/image/jf-white.png" alt=""/></Link>
          <ul className={style.navlist}>
            <Link to="/index"><Icon type="home"/></Link>
            <Link to="/home"><Icon type="book"/></Link>
            <Link to="/newblog"><Icon type="edit"/></Link>
            <Link to="/login"><Icon type="user"/></Link>
            <a onClick={()=>this.changeBG()}><Icon type={bg?'heart':'heart-o'}/></a>
          </ul>
        </div>
      </Col>
    )
  }
}
