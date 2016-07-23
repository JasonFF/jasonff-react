import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

@connect(state=>({user:state.user}),
{})
export default class Navbar extends Component {
  render() {
    const style = require('./Navbar.scss');
    return (
      <nav className={style.nav}>
        <Link to="/" className={style.logo} style={{backgroundImage:`url(/static/image/jf.png)`}}></Link>
        <ul className={style.navlist}>
          <Link to="/">首</Link>
          <Link to="/index">列</Link>
          <Link to="/newblog">作</Link>
          <Link to="/login">入</Link>
        </ul>
      </nav>
    )
  }
}
