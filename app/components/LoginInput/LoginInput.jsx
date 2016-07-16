import React, {Component} from 'react';
import {Icon} from 'antd';

export default class LoginInput extends Component {
  render() {
    const style = require('./LoginInput.scss');
    return (
      <div className={style.container}>
        <div className={style.title}>
          {
            this.props.type=='tel'&&<Icon type='mobile'/>
          }
          {
            this.props.type=='email'&&<Icon type='mail'/>
          }
          {
            this.props.type=='password'&&<Icon type='lock'/>
          }
          {this.props.text}</div>
        <input className={style.input} {...this.props}/>
      </div>
    )
  }
}
