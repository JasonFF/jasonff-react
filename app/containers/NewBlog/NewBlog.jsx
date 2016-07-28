import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reqNewBlog} from 'actions';
import {getFormValue} from 'widgets';
import {Navbar} from 'components';
import {Row,Col,message} from 'antd';

export default class NewBlog extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let formvalue = getFormValue(e.target);
    formvalue.token = this.props.user.token;
    this.props.reqNewBlog(formvalue);
    window.localStorage.saving = false
  }
  componentDidMount() {
    const savingData = window.localStorage.saving||{};
    const {title, content} = JSON.parse(savingData);
    document.querySelector('input[name="title"]').value = title||'';
    document.querySelector('textarea[name="content"]').value = content||'';
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
  saveClick(e) {
    e.preventDefault()
    const formNode = e.target.parentNode.parentNode;
    const savingData = {
      title: formNode.querySelector('input').value,
      content: formNode.querySelector('textarea').value
    }
    window.localStorage.saving = JSON.stringify(savingData)
  }
  render() {
    const style = require('./NewBlog.scss');
    return (
      <main className={style.container}>
        <Navbar background="/static/image/bg-2.jpg"/>
        <Col xs={24} sm={{span:17,offset:7}} className={style.rightBox}>
          <form className={style.form} onSubmit={(e)=>this.handleSubmit(e)}>
            <input className={style.titleInput} name="title" type="text"/>
            <div className={style.toolbtns}>
              <button type='submit'>提交</button>
              <button onClick={(e)=>this.saveClick(e)}>保存</button>
            </div>
            <textarea className={style.contentBox} name="content"></textarea>
          </form>
        </Col>
      </main>
    )
  }
}

NewBlog.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({user: state.user, newBlog: state.newBlog}),{reqNewBlog})(NewBlog)
