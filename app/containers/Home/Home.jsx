import React, {Component, PropTypes} from 'react';
import {Navbar} from 'components';
import {Link} from 'react-router';

export default class Home extends Component {
  componentWillMount() {
    this.setState({
      go: false
    })
  }
  toIndex() {
    const that = this;
    this.setState({
      go: true
    })
    setTimeout(function(){
      that.context.router.push('/index')
    },500)
  }
  render() {
    const style = require('./Home.scss');
    const {go} = this.state;
    return (
      <div className={style.container}>
        <div className={style.top} style={{backgroundImage:'url(/static/image/bgt.jpg)'}}></div>
        <div className={style.bottom} style={{backgroundImage:'url(/static/image/bgb.jpg)'}}></div>
        <div className={`${style.mask} ${go?style.go:''}`}></div>
        <div onClick={()=>this.toIndex()} className={`${style.logo} ${go?'animated fadeOut':''}`} style={{backgroundImage:'url(/static/image/jf.png)'}}></div>
      </div>
    )
  }
}
Home.contextTypes = {
  router: PropTypes.object
}
