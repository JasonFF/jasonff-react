import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

export default class Starter extends Component {
  render() {
    const style = require('./Starter.less');
    return (
      <div className={style.container}>

      </div>
    )
  }
}
Starter.contextTypes = {
  router: PropTypes.object
}
