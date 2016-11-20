import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar} from 'components';

const style = require('./Hello.less');

export default class Home extends Component {
    render() {
        return <div className={style.mainContainer}>
            <Navbar></Navbar>

        </div>
    }
}
