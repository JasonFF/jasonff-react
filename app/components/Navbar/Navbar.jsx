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
    // componentDidMount() {
    //     let pretop = 0;
    //     let direction = 1;
    //     const navbar = document.getElementById('navbar');
    //     window.onscroll = function() {
    //         let scrollTop = document.body.scrollTop;
    //         if ( scrollTop > pretop) {
    //             direction = 1;
    //             pretop = scrollTop;
    //         } else {
    //             direction = 0;
    //             pretop = scrollTop;
    //         }
    //
    //         if (direction) {
    //             navbar.style.top = '-100%';
    //         } else {
    //             navbar.style.top = '0';
    //         }
    //     }
    // }
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
        return <div id="navbar" className={style.container}>
            <div className={style.logo}>
                <h1>JasonFF</h1>
                {/* <img src="/static/image/jf-white.png" alt=""/> */}
            </div>
            <div className={style.motto}>CHALLENGE EVERYTHING</div>
            <div onClick={()=>this.handleClick()} className={`${style.navBtn} ${this.state.open?style.rotate:''}`}>
                <i className='icon'>&#xe67b;</i>
            </div>

            {/* <ul className={style.nav}>
                {items.map((item,i)=><li className='animated fadeIn' onClick={()=>this.handleClick()} key={i}>
                    {item.notebook}
                </li>)}
            </ul> */}
        </div>
    }
}
