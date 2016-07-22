import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reqNewBlog} from 'actions';
import {getFormValue} from 'widgets';
import {Navbar} from 'components';
import {Row,Col,Button} from 'antd';

export default class NewBlog extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let formvalue = getFormValue(e.target);
    formvalue.token = this.props.user.token;
    console.log(formvalue)
    this.props.reqNewBlog(formvalue)
  }
  render() {
    const style = require('./NewBlog.scss');
    return (
      <main className={style.container}>
        <Navbar></Navbar>
        <Col xs={24} sm={{span:20,offset:2}}>
          <Col xs={24} sm={{span:18}}>
            <form className={style.form} onSubmit={(e)=>this.handleSubmit(e)}>
              <input name="title" type="text"/>
              <textarea name="content" id="" cols="30" rows="10"></textarea>
              <Button type="primary" htmlType='submit'>提交</Button>
            </form>
          </Col>
        </Col>
      </main>
    )
  }
}

NewBlog.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({user: state.user, newBlog: state.newBlog}),{reqNewBlog})(NewBlog)
