import React,{Component} from 'react';
import {connect} from 'react-redux';
import {action} from 'actions';
const style = require('./NavSide.less');

@connect(state=>({Notebooks:state.truck.Notebooks,router:state.truck.router,NavSide:state.truck.NavSide}),{action})
export default class NavSide extends Component {
    constructor() {
        super()
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleClick(i) {
        if (i == -1) {
            return this.props.router.push('/hello')
        }
        this.props.router.push('/notebook/'+i)
    }
    handleOpen() {
        const that = this;
        const content = document.getElementById('content');
        const preMask = document.getElementById('navMask');
        const navMask = preMask?preMask:document.createElement('div');
        navMask.className = style.mask;
        navMask.style.display = '';
        navMask.id = 'navMask';
        document.body.appendChild(navMask)
        content.className = style.content;
        navMask.onclick = function() {
            navMask.style.display = 'none';
            content.className = '';
            that.props.action({
                moduleName: 'NavSide',
                goods: {
                    open: false
                }
            })
        };


    }
    componentWillReceiveProps(nextProps) {
        let nowOpen = false;
        let nextOpen = false;
        try {
            nowOpen = this.props.NavSide.open;
        } catch (e) {}
        try {
            nextOpen = nextProps.NavSide.open;
        } catch (e) {}
        if (nowOpen != nextOpen && nextOpen) {
            this.handleOpen()
        }
    }
    render() {
        console.log('navside render')
        const {items} = this.props.Notebooks||{};
        let index = this.props.params.id;
        if (index===undefined) {
            index = -1
        }
        return <div className={style.navside}>
            <div className={style.nheader}>
                <img src="/static/image/jf.png" alt=""/>
            </div>
            <div className={style.nlist}>
                <div style={{top:`${(index/1+1)*40}px`}} className={style.activeBar}></div>
                <ul>
                    <li onClick={()=>this.handleClick(-1)} className={index==-1?style.active:''} >全部</li>
                    {
                        items&&items.map((item,i)=><li className={index==i?style.active:''} onClick={()=>this.handleClick(i)} key={i}>
                            {item.notebook}
                        </li>)
                    }
                </ul>
            </div>


        </div>
    }
}

// export default ({data,close,open,getValue,router,index}) => {
//     const preDiv = document.getElementById('navside');
//     const preMask = document.getElementById('navMask');
//     const navside = preDiv?preDiv:document.createElement('div');
//     const navMask = preMask?preMask:document.createElement('div');
//     const main = document.getElementById('main');
//     const mobileMain = document.getElementById('mobileMain');
//     const closeNav = () => {
//         main.className = '';
//         navMask.style.display = 'none';
//         if (typeof close == 'function') {
//             close()
//         }
//     }
//
//     navside.id = 'navside';
//     navside.className = style.navside;
//     navMask.className = style.mask;
//     navMask.id = 'navMask';
//     navMask.style.display = '';
//     main.className = style.main_open;
//
//     navMask.onclick = closeNav;
//
//     mobileMain.appendChild(navside);
//     mobileMain.appendChild(navMask);
//
//     ReactDOM.render(<NavSide getValue={getValue} router={router} index={index} data={data}></NavSide>,navside);
//
//     if (typeof open == 'function') {
//         open()
//     }
// }
