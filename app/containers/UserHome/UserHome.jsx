import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar} from 'components';
import {connect} from 'react-redux';
import {Col} from 'antd'

export default class UserHome extends Component {
  render() {
    const style = require('./UserHome.scss');
    return (
      <div className={style.container}>
        <Navbar background="-" />
        <Col xs={24} sm={{span:8,offset:8}}>
          hello
        </Col>
      </div>
    )
  }
}
