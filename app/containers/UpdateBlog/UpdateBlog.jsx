import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getFormValue} from 'widgets';
import {Navbar, BlogForm} from 'components';
import {Row,Col,message} from 'antd';
import {reqUpdateBlog, reqBlogDetail} from 'actions';

export class UpdateBlog extends Component {
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
      update: false,
      title: '',
      content: ''
    })
  }
  componentWillReceiveProps(nextProps) {
    if (this.state.init == 1) {
      this.setState({
        title: nextProps.blogDetail.data.title,
        content: nextProps.blogDetail.data.content
      })
    }
    if (this.state.update) {
      if (nextProps.updateBlog.status == 1) {
          message.success('更新成功！')
          this.setState({
            title: nextProps.updateBlog.data.title,
            content: nextProps.updateBlog.data.content
          })
      }
      if (nextProps.updateBlog.status == 0) {
          message.error('更新失败！')
          console.log(nextProps.updateBlog)
      }
    }
    this.setState({
      init: this.state.init+1
    })
  }
  render() {
    const style = require('./UpdateBlog.scss');
    const {title,content} = this.state;
    return (
      <main className={style.container}>
        <Navbar background="/static/image/bg-2.jpg"/>
        <Col xs={24} sm={{span:17,offset:7}} className={style.rightBox}>
          <BlogForm defaultValue={{title:title,content:content}} onSubmit={this.handleSubmit.bind(this)}/>
        </Col>
      </main>
    )
  }
}

UpdateBlog.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({user: state.user, updateBlog: state.updateBlog, blogDetail: state.blogDetail}),{reqUpdateBlog, reqBlogDetail})(UpdateBlog)
