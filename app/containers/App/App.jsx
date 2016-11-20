import React, {Component, PropTypes} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import animate from '../../theme/animate_u.css';

@connect(state=>({}),{action})
export default class App extends Component {
    componentWillMount() {
        const that = this;
        this.props.action({moduleName: 'Notebooks', method: 'GET', url: 'notebook.json'})
        this.props.action({moduleName: 'Blogs', method: 'GET', url: 'data.json',callback:function(data){
            if (data) {
                that.props.action({
                    moduleName: 'BlogList',
                    goods: {
                        items: data
                    }
                })
            }

        }})
    }
    render() {
        const style = require('./App.less');
        return (
            <div className={style.container} style={{minHeight:`${document.body.clientHeight}`}}>
                {this.props.children}
            </div>
        )
    }
}
