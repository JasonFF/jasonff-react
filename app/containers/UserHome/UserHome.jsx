import React, {Component, PropTypes} from 'react';

export default class UserHome extends Component {
  render() {
    const style = require('./UserHome.scss');
    return (
      <div className={style.container}>
        <img src="/static/image/wmj.jpg" alt=""/>
        王梦婕！哈哈哈哈哈哈
      </div>
    )
  }
}
