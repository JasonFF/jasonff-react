import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar,BlogList} from 'components';

const style = require('./Hello.less');

@connect(state=>({Blogs: state.truck.Blogs}),{})
export default class Home extends Component {
    render() {
        const {items} = this.props.Blogs||{}
        return <div className={style.mainContainer}>
            <Navbar></Navbar>
            <div style={{height:'70px'}}></div>
            <BlogList data={items||[]}></BlogList>
        </div>
    }
}
