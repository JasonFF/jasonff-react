import React,{Component} from 'react';

export default class AboutMe extends Component {
    render() {
        const style = require('./AboutMe.less');
        return <div className={style.container}>
            <div className={style.header}>
                <img src="/static/image/jf.png" alt=""/>
                <div>
                    <p>傅周盛</p>

                </div>
            </div>
        </div>
    }
}
