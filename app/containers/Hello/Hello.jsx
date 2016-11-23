import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar,BlogList} from 'components';

const style = require('./Hello.less');

@connect(state=>({Blogs: state.truck.Blogs,Notebooks:state.truck.Notebooks}),{action})
export default class Home extends Component {
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
        return <div className={style.mainContainer}>
            <Navbar type="notebook"></Navbar>
            <div style={{height:'70px'}}></div>
            <BlogList></BlogList>
        </div>
    }
}
