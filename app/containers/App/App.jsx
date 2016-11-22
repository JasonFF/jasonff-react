import React, {Component, PropTypes} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import animate from '../../theme/animate_u.css';
import {withRouter} from 'react-router';
import {NavSide} from 'components';

@connect(state=>({}),{action})
@withRouter
export default class App extends Component {
    componentWillMount() {
        const that = this;
        this.props.action({
            moduleName: 'Notebooks',
            method: 'GET',
            url: 'notebook.json'
        })
        this.props.action({
            moduleName: 'Blogs',
            method: 'GET',
            url: 'data.json'
        })
        this.props.action({
            moduleName: "router",
            goods: this.props.router
        })
    }
    render() {
        const style = require('./App.less');
        return (
            <div className={style.container}>
                <NavSide params={this.props.params}></NavSide>
                <div id="content" style={{minHeight:`${document.getElementById('main').clientHeight}px`}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
