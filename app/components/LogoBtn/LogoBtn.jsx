import React,{Component} from 'react';
import {connect} from 'react-redux';
import {action} from 'actions';

@connect(state=>({NavSide:state.truck.NavSide}),{action})
export default class LogoBtn extends Component {
    handleClick() {
        this.props.action({
            moduleName: 'NavSide',
            goods: {
                open: true
            }
        })
    }
    render() {
        let open = false;
        try {
            open = this.props.NavSide.open
        } catch (e) {}
        const style = require('./LogoBtn.less');
        return <button onClick={()=>this.handleClick()} className={style.logoBtn+` ${open?style.active:''}`}>
        </button>
    }
}
