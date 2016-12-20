import React, {Component, PropTypes} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import animate from '../../theme/animate_u.css';
import {withRouter} from 'react-router';
import {NavSide,LogoBtn} from 'components';

@connect(state=>({}),{action})
@withRouter
export default class App extends Component {
    componentWillMount() {
        const that = this;
        this.setState({
            a: true
        })
        this.props.action({
            moduleName: 'Notebooks',
            method: 'GET',
            url: 'notebook.json',
            callback: function(data) {
                that.setState({
                    n: true
                })
            }
        })
        this.props.action({
            moduleName: 'Blogs',
            method: 'GET',
            url: 'data.json',
            callback: function(data) {
                that.setState({
                    b: true
                })
            }
        })
        this.props.action({
            moduleName: "router",
            goods: this.props.router
        })
    }
    render() {
        const style = require('./App.less');
        const {n,b} = this.state;
        return (
            <div className={style.container}>
                {window.location.pathname!="/"&&<LogoBtn></LogoBtn>}
                {window.location.pathname!="/"&&<NavSide params={this.props.params}></NavSide>}
                <div id="content" style={{minHeight:`${document.getElementById('main').clientHeight}px`}}>
                    {n&&b&&this.props.children}
                </div>
            </div>
        )
    }
}
