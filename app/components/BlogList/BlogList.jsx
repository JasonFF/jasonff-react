import React,{Component} from 'react';
import {Link} from 'react-router';
import {removeTags} from 'widgets';

const style = require('./BlogList.less');

export default class BlogList extends Component {
    render() {
        const {data} = this.props;
        return <div className={style.blogList}>
            {
                data.map((item,i)=><BlogBox key={i} data={item}></BlogBox>)
            }
        </div>
    }
}

class BlogBox extends Component {
    render() {
        const {data} = this.props;
        return <div className={style.blogBox}>
            <h2><Link to='/'><i className="icon">&#xe66a;</i>{data.title}</Link></h2>
            <div className={style.info}>
                <li><i className="icon">&#xe625;</i>{data.notebook}</li>
                <li><i className="icon">&#xe63e;</i>{data.notebook}</li>
            </div>
            <div className={style.digest}>
                {removeTags(data.html)}
            </div>

        </div>
    }
}
