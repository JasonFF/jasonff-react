import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {action} from 'actions';

const style = require('./Navbar.less');


@connect(state=>({NavSide:state.truck.NavSide}),{action})
export default class Navbar extends Component {
    // handleClick() {
    //     this.props.action({
    //         moduleName: 'NavSide',
    //         goods: {
    //             open: true
    //         }
    //     })
    // }
    render() {
        // let open = false;
        // try {
        //     open = this.props.NavSide.open
        // } catch (e) {}
        return <div id="navbar" className={style.container}>
            <div className={style.logo}>
                <h1>JasonFF</h1>
                {/* <img src="/static/image/jf-white.png" alt=""/> */}
            </div>
            {/* <div className={style.motto}>CHALLENGE EVERYTHING</div> */}
            {/* <div onClick={()=>this.handleClick()} className={`${style.navBtn} ${open?style.rotate:''}`}>
                <i className='icon'>&#xe67b;</i>
            </div> */}

            {/* <ul className={style.nav}>
                {items.map((item,i)=><li className='animated fadeIn' onClick={()=>this.handleClick()} key={i}>
                    {item.notebook}
                </li>)}
            </ul> */}
        </div>
    }
}
