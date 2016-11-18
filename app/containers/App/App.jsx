import React, {Component, PropTypes} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';

@connect(state=>({}),{action})
export default class App extends Component {
    componentWillMount() {
        this.props.action({moduleName: 'Notebooks', method: 'GET', url: 'notebook.json'})
        this.props.action({moduleName: 'Blogs', method: 'GET', url: 'data.json'})
    }
    render() {
        const style = require('./App.less');
        return (
            <div className={style.container}>
                {this.props.children}
            </div>
        )
    }
}
