import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getFormValue} from 'widgets';
import {Navbar} from 'components';
import {Row,Col,message} from 'antd';
import {reqUpdateBlog, reqBlogDetail} from 'actions';

export default class UpdateBlog extends Component {
  handleSubmit(e) {
    e.preventDefault()
    let formvalue = getFormValue(e.target);
    formvalue.token = this.props.user.token;
    formvalue.blogId = this.props.params.id;
    this.props.reqUpdateBlog(formvalue);
    this.setState({
      update: true
    })
  }
  componentWillMount() {
    this.props.reqBlogDetail({token:this.props.user.token,blogId: this.props.params.id})
    this.setState({
      init: 0,
      update: false
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.init == 1) {
      document.querySelector('input[name=title]').value = nextProps.blogDetail.data.title
      document.querySelector('textarea[name=content]').value = nextProps.blogDetail.data.content
    }
    if (this.state.update) {
      if (nextProps.updateBlog.status == 1) {
          message.success('更新成功！')
      }
      if (nextProps.updateBlog.status == 0) {
          message.error('更新失败！')
          console.log(nextProps.updateBlog)
      }
    }
    this.setState({
      init: this.state.init+1
    })
    console.log(nextProps.updateBlog)
  }
  render() {
    const style = require('./UpdateBlog.scss');
    return (
      <main className={style.container}>
        <Navbar background="/static/image/bg-2.jpg"/>
        <Col xs={24} sm={{span:17,offset:7}} className={style.rightBox}>
          <form className={style.form} onSubmit={(e)=>this.handleSubmit(e)}>
            <input className={style.titleInput} name="title" type="text"/>
            <div className={style.toolbtns}>
              <button type='submit'>提交</button>
            </div>
            <textarea className={style.contentBox} name="content"></textarea>
          </form>
        </Col>
      </main>
    )
  }
}

UpdateBlog.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({user: state.user, updateBlog: state.updateBlog, blogDetail: state.blogDetail}),{reqUpdateBlog, reqBlogDetail})(UpdateBlog)
