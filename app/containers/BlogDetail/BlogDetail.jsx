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
    render() {
        const {data} = this.state;
        return <div>
            <Navbar type="blog"></Navbar>
            <div className="markdown-body" style={{padding: '0 10px'}}>
                {
                    data&&<div dangerouslySetInnerHTML={{__html: data.html}}></div>
                }
            </div>


            <div id="uyan_frame"></div>
            <script type="text/javascript" src="http://v2.uyan.cc/code/uyan.js?uid=2060453"></script>

        </div>
    }
}
