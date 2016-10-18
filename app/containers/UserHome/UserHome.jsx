import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Navbar} from 'components';
import {connect} from 'react-redux';
import {Col} from 'antd'
import {reqMyBlogList} from 'actions';
import moment from 'moment';

export class UserHome extends Component {
  componentWillMount() {
    this.props.reqMyBlogList({token:this.props.user.token})
  }
  render() {
    const style = require('./UserHome.scss');
    const myBlogList = this.props.myBlogList.data;
    return (
      <div className={style.container}>
        <Navbar background="-" />
        <Col className={style.mainBox} xs={24} sm={{span:15, offset:7}}>
          {
            myBlogList.map((data,index)=><div className={style.blogBox} key={'index'+index}>
              <Link className={style.blogTitle} to={'/blog/'+data._id}>{data.title}</Link>
              <p className={style.time}>{moment(data.createTime).format("YYYY-MM-DD HH:mm")}</p>
            </div>)
          }
        </Col>
      </div>
    )
  }
}

UserHome.contextTypes = {
  router: PropTypes.object
}

export default connect(state=>({
  user: state.user,
  myBlogList: state.myBlogList
}),{reqMyBlogList})(UserHome);
