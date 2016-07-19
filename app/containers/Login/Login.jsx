import React, {Component, PropTypes} from 'react';
import { Button, Form, Row, Col, Icon, Switch, Modal, message } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
import {LoginInput} from 'components';

import {getFormValue} from 'widgets';
import {reqLogin} from 'actions';
import {connect} from 'react-redux';

const localStorage = localStorage?localStorage:{};

export default class Login extends Component {

  componentWillMount() {
    this.setState({
      remember: localStorage['remember']
    })
  }
  submit(e) {
    e.preventDefault();
    let formvalue = getFormValue(e.target);
    formvalue['version'] = 1;
    this.props.reqLogin(formvalue);
    if (this.state.remember) {
      localStorage['phoneNum'] = e.target[0].value;
      localStorage['remember'] = true;
    }else {
      localStorage['phoneNum'] = '';
      localStorage['remember'] = '';
    }
  }
  remember(checked) {
    this.setState({
      remember: checked
    });
  }
  componentWillReceiveProps(nextProps) {
    const {status} = nextProps.user;
    if (status != 1) {
      Modal.error({title:'账号或者密码错误。。'})
    };
    if (status == 1) {
      message.success('登录成功！')
      console.log(this)
      this.context.router.push('/statistics')
    }
  }
  render() {
    const style = require('./Login.scss');
    const {phoneNum, remember} = localStorage;
    return (
      <div className={style.container} style={{backgroundImage:'url(/static/image/warcraft.jpg)'}}>
        <Col xs={24} sm={{span:12, offset:6}} lg={{span: 10, offset: 7}} className={style.loginbox}>
          <QueueAnim component={Form} onSubmit={(e)=>this.submit(e)} className={style.form} type="bottom" leaveReverse>
            <Row key='item1'>
              <Col span={16} offset={4}>
                <img className={style.logo} src="/static/image/jf.png" alt=""/>
                <h2 className={style.title}>What do you want to do?</h2>
              </Col>
            </Row>
            <Row key='item2'>
              <Col span={16} offset={4}>
                <LoginInput type='email' name="email" defaultValue={phoneNum} />
              </Col>
            </Row>
            <Row key='item3'>
              <Col span={16} offset={4}>
                <LoginInput type='password' maxLength='30' name="password" />
              </Col>
            </Row>
            <Row key='item4'>
              <Col span={16} offset={4}>
                <Button className={style.loginBtn} loading={this.props.user.loading} type='primary' htmlType='submit'>登录</Button>
              </Col>
            </Row>
            <Row key='item5'>
              <Col className={style.remember} span={16} offset={4}>
                记住我好吗？<Switch checkedChildren="好" unCheckedChildren="滚" defaultChecked={remember} onChange={this.remember.bind(this)} />
              </Col>
            </Row>
          </QueueAnim>
        </Col>
      </div>
    )
  }
}

Login.defaultProps = {
  user: {
    loading: false
  }
};
Login.proptpyes = {
  user: PropTypes.object
};
Login.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({
  user: state.user
}),{reqLogin})(Login)
