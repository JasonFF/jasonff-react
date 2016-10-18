import React, {Component, PropTypes} from 'react';
import { Button, Form, Row, Col, Icon, Switch, Modal, message } from 'antd';
import QueueAnim from 'rc-queue-anim';
import Animate from 'rc-animate';
import {LoginInput} from 'components';

import {getFormValue} from 'widgets';
import {reqSignup} from 'actions';
import {connect} from 'react-redux';

const localStorage = localStorage?localStorage:{};

export class Signup extends Component {
  submit(e) {
    e.preventDefault();
    let formvalue = getFormValue(e.target);
    this.props.reqSignup(formvalue);
  }
  componentWillReceiveProps(nextProps) {
    const {status,msg} = nextProps.signup;
    switch (status) {
      case 0:
        Modal.error({title:msg})
        break;
      case 1:
        message.success('注册成功！');
        this.context.router.push('/login');
        break;
      case 2:
        message.error('该邮箱已经注册了')
        break;
      case 3:
        Modal.error({title: "密码两次输入不对"});
        break;
    }
  }
  render() {
    const style = require('./Signup.scss');
    return (
      <div className={style.container} style={{backgroundImage:'url(/static/image/warcraft.jpg)'}}>
        <Col xs={24} sm={{span:12, offset:6}} lg={{span: 10, offset: 7}} className={style.loginbox}>
          <QueueAnim component={Form} onSubmit={(e)=>this.submit(e)} className={style.form} type="bottom" leaveReverse>
            <Row key='item1'>
              <Col span={16} offset={4}>
                <h2 className={style.title}>How do you do.</h2>
              </Col>
            </Row>
            <Row key='item2'>
              <Col span={16} offset={4}>
                <LoginInput type='email' name="email" />
              </Col>
            </Row>
            <Row key='item3'>
              <Col span={16} offset={4}>
                <LoginInput type='password' maxLength='30' name="password" />
              </Col>
            </Row>
            <Row key='item4'>
              <Col span={16} offset={4}>
                <LoginInput type='password' maxLength='30' name="passwordRe" />
              </Col>
            </Row>
            <Row key='item5'>
              <Col span={16} offset={4}>
                <Button className={style.loginBtn} loading={this.props.signup.loading} type='primary' htmlType='submit'>注册</Button>
              </Col>
            </Row>
          </QueueAnim>
        </Col>
      </div>
    )
  }
}

Signup.defaultProps = {
  signup: {
    loading: false
  }
};
Signup.proptpyes = {
  signup: PropTypes.object
};
Signup.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({
  signup: state.signup
}),{reqSignup})(Signup)
