import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {NavSide} from 'components';

const style = require('./Navbar.less');


@connect(state=>{
    return {
        Notebooks: state.truck.Notebooks
    }
},{})
export default class Navbar extends Component {
    componentWillMount() {
        this.setState({
            open: false
        })
    }
    handleClick() {
        const that = this;
        NavSide({
            open: function() {
                that.setState({
                    open: true
                })
            },
            close: function() {
                that.setState({
                    open:false
                })
            }
        })
    }
    render() {
        const {items=[]} = this.props.Notebooks||{};
        return <div className={style.container}>
            <div className={style.logo}>
                <h1>JasonFF</h1>
                {/* <img src="/static/image/jf-white.png" alt=""/> */}
            </div>
            <div className={style.motto}>CHALLENGE EVERYTHING</div>
            <div onClick={()=>this.handleClick()} className={`${style.navBtn} ${this.state.open?style.rotate:''}`}>
                <i className='icon'>&#xe67c;</i>
            </div>

            {/* <ul className={style.nav}>
                {items.map((item,i)=><li className='animated fadeIn' onClick={()=>this.handleClick()} key={i}>
                    {item.notebook}
                </li>)}
            </ul> */}
        </div>
    }
}
