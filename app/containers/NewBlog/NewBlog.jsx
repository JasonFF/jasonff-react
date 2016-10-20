import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reqNewBlog} from 'actions';
import {getFormValue} from 'widgets';
import {Navbar,BlogForm} from 'components';
import {Row,Col,message} from 'antd';

export class NewBlog extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let formvalue = getFormValue(e.target);
    formvalue.token = this.props.user.token;
    this.props.reqNewBlog(formvalue);
    console.log(formvalue)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.newBlog.status == 1) {
      message.success('新建成功！')
    }
    if (nextProps.newBlog.status == 0) {
      message.error(nextProps.newBlog.msg)
    }
    if (nextProps.newBlog.status == 3) {
      message.error(nextProps.newBlog.msg)
    }
  }
  render() {
    const style = require('./NewBlog.scss');
    return (
      <main className={style.container}>
        <Navbar background="/static/image/bg-2.jpg"/>
        <Col xs={24} sm={{span:17,offset:7}} className={style.rightBox}>
          <BlogForm onSubmit={this.handleSubmit.bind(this)} />
        </Col>
      </main>
    )
  }
}

NewBlog.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({user: state.user, newBlog: state.newBlog}),{reqNewBlog})(NewBlog)
