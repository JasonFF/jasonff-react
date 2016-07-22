import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar} from 'components';
import {connect} from 'react-redux';

export default class UserHome extends Component {
  render() {
    const style = require('./UserHome.scss');
    return (
      <div className={style.container}>
        <Navbar></Navbar>
        <Link to="/newblog">新建博客</Link>
      </div>
    )
  }
}
