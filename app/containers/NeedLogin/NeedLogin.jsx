import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {message} from 'antd';
import {initLogin} from 'actions';

export default class NeedLogin extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.checkLogin.status==23333) {
      message.error('逗。。。。')
      this.context.router.push('/login');
      window.localStorage.jftoken = '';
      this.props.initLogin()
    }
  }
  render() {
    const style = require('./NeedLogin.scss');
    return (
      <div className={style.needlogin}>
        {this.props.children}
      </div>
    )
  }
}
NeedLogin.contextTypes = {
  router: PropTypes.object
}
export default connect(state=>({checkLogin:state.checkLogin}),{initLogin})(NeedLogin)
