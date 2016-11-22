import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar,BlogList} from 'components';

const style = require('./BlogDetail.less');

export default class BlogDetail extends Component {
    render() {
        return <div>
            <Navbar type="blog"></Navbar>
        </div>
    }
}
