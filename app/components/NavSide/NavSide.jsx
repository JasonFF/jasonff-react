import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const style = require('./NavSide.less');

class NavSide extends Component {
    render() {
        return <div className={style.navBox}>
            NavSide
        </div>
    }
}

export default ({data,close,open}) => {
    const preDiv = document.getElementById('navside');
    const preMask = document.getElementById('navMask');
    const navside = preDiv?preDiv:document.createElement('div');
    const navMask = preMask?preMask:document.createElement('div');
    const main = document.getElementById('main');
    const mobileMain = document.getElementById('mobileMain');
    const closeNav = () => {
        main.className = '';
        navMask.style.display = 'none';
        if (typeof close == 'function') {
            close()
        }
    }

    navside.id = 'navside';
    navside.className = style.navside;
    navMask.className = style.mask;
    navMask.id = 'navMask';
    navMask.style.display = '';
    main.className = style.main_open;
    mobileMain.className = style.body;

    navMask.onclick = closeNav;

    mobileMain.appendChild(navside);
    mobileMain.appendChild(navMask);

    ReactDOM.render(<NavSide></NavSide>,navside);

    if (typeof open == 'function') {
        open()
    }
}
