import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(state=>({user:state.user.data}),
{})
export default class Navbar extends Component {
  render() {
    const style = require('./Navbar.scss');
    return (
      <nav className={style.nav}>
        <div className={style.logo}>
          <img src="/static/image/logo_white.png" alt=""/>
        </div>
        <div className={style.userinfo}>
          <div className={style.image} style={{backgroundImage:`url(${this.props.user.image})`}}></div>
        </div>
      </nav>
    )
  }
}
