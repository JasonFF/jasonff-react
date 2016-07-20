import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router'

@connect(state=>({user:state.user}),
{})
export default class Navbar extends Component {
  render() {
    const style = require('./Navbar.scss');
    return (
      <nav className={style.nav} style={{backgroundImage:'url(/static/image/bg-1.jpg)'}}>
        <Link to="/" className={style.logo} style={{backgroundImage:`url(/static/image/jf.png)`}}></Link>
      </nav>
    )
  }
}
