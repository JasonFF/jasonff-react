import React,{Component} from 'react';
import {Link} from 'react-router';
import {removeTags} from 'widgets';
import {connect} from 'react-redux';
import {action} from 'actions';

const style = require('./BlogList.less');

@connect(state=>({BlogList:state.truck.BlogList,Blogs:state.truck.Blogs,Notebooks:state.truck.Notebooks}),{action})
export default class BlogList extends Component {
    componentWillMount() {
        const hasId = !!Object.keys(this.props.params).length;
        if (hasId&&this.props.Notebooks) {
            this.props.action({
                moduleName: 'BlogList',
                goods: {
                    items: this.props.Notebooks.items[this.props.params.id].data
                }
            })
        }
        if (!hasId&&this.props.Blogs) {
            this.props.action({
                moduleName: 'BlogList',
                goods: {
                    items: this.props.Blogs.items
                }
            })
        }
    }
    render() {
        const {items=[]} = this.props.BlogList||{};
        return <div className={style.blogList}>
            {
                items.map((item,i)=><BlogBox key={i} data={item}></BlogBox>)
            }
        </div>
    }
}

class BlogBox extends Component {
    render() {
        const {data} = this.props;
        return <div className={style.blogBox}>
            <h2><Link to={`/blog/${data.id}`}><i className="icon">&#xe66a;</i>{data.title}</Link></h2>
            <div className={style.info}>
                <li><i className="icon">&#xe625;</i>{data.notebook}</li>
                <li><i className="icon">&#xe63e;</i>{data.time}</li>
            </div>
            <div className={style.digest}>
                {removeTags(data.html)}
            </div>

        </div>
    }
}
