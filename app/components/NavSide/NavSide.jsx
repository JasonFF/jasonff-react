import React,{Component} from 'react';
import ReactDOM from 'react-dom';

const style = require('./NavSide.less');

class NavSide extends Component {
    componentWillMount() {
        this.setState({
            index: -1
        })
    }
    handleClick(i) {
        this.props.getValue(i)
        this.setState({
            index: i
        })
    }
    render() {
        const {data} = this.props;
        const {index} = this.state;
        return <div className={style.navBox}>
            <div className={style.nheader}>
                <img src="/static/image/jf.png" alt=""/>
            </div>
            <div className={style.nlist}>
                <li onClick={()=>this.handleClick(-1)} className={index==-1?style.active:''} >全部</li>
                {
                    data.map((item,i)=><li className={index==i?style.active:''} onClick={()=>this.handleClick(i)} key={i}>
                        {item.notebook}
                    </li>)
                }
            </div>


        </div>
    }
}

export default ({data,close,open,getValue}) => {
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

    ReactDOM.render(<NavSide getValue={getValue} data={data}></NavSide>,navside);

    if (typeof open == 'function') {
        open()
    }
}
