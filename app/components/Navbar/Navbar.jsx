import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {NavSide} from 'components';
import {action} from 'actions';

const style = require('./Navbar.less');


@connect(state=>{
    return {
        Notebooks: state.truck.Notebooks,
        Blogs: state.truck.Blogs
    }
},{action})
export default class Navbar extends Component {
    constructor(){
        super()
        this.getValue = this.getValue.bind(this);
    }
    componentWillMount() {
        this.setState({
            open: false
        })
    }
    getValue(i) {

        if (i == -1) {
            this.props.action({
                moduleName: 'BlogList',
                goods: {
                    items: this.props.Blogs.items
                }
            })
        } else {
            this.props.action({
                moduleName: 'BlogList',
                goods: {
                    items: this.props.Notebooks.items[i].data
                }
            })
        }
    }
    handleClick() {
        const that = this;
        const {items} = this.props.Notebooks||{}
        NavSide({
            data: items,
            getValue: this.getValue,
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
