import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar,BlogList} from 'components';

const style = require('./Hello.less');

@connect(state=>({Blogs: state.truck.Blogs,Notebooks:state.truck.Notebooks}),{action})
export default class Home extends Component {
    componentWillReceiveProps(nextProps) {
        const hasId = !!Object.keys(nextProps.params).length;
        if (hasId&&nextProps.Notebooks) {
            this.props.action({
                moduleName: 'BlogList',
                goods: {
                    items: nextProps.Notebooks.items[nextProps.params.id].data
                }
            })
        }
        if (!hasId&&nextProps.Blogs) {
            this.props.action({
                moduleName: 'BlogList',
                goods: {
                    items: nextProps.Blogs.items
                }
            })
        }
    }
    render() {
        return <div className={style.mainContainer}>
            <Navbar type="notebook"></Navbar>
            <div style={{height:'70px'}}></div>
            <BlogList></BlogList>
        </div>
    }
}
