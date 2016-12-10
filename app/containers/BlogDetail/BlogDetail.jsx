import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar,BlogList} from 'components';
import {idToKey} from 'widgets';

const style = require('./BlogDetail.less');

@connect(state=>({Blogs:state.truck.Blogs}),{})
export default class BlogDetail extends Component {
    componentWillMount() {
        const {items} = this.props.Blogs;
        const data = items[idToKey(this.props.params.id,items)];
        this.setState({
            data: data
        })
    }
    componentDidMount() {
        UYAN_L.init()
    }
    render() {
        const {data} = this.state;
        return <div className={style.mainContainer}>
            <Navbar type="blog"></Navbar>
            <div style={{height:'30px'}}></div>
            <div className="markdown-body animated fadeInRight" style={{padding: '0 10px'}}>
                {
                    data&&<div dangerouslySetInnerHTML={{__html: data.html}}></div>
                }
            </div>
            <div id="uyan_frame"></div>
        </div>
    }
}
