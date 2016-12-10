import React,{Component} from 'react';
import {action} from 'actions';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Navbar,BlogList} from 'components';

const style = require('./Hello.less');

export default class Home extends Component {
    render() {
        return <div className={style.mainContainer+' '+style.container}>
            <Navbar type="notebook"></Navbar>
            <div style={{height:'40px'}}></div>
            <BlogList key={JSON.stringify(this.props.params)} params={this.props.params}></BlogList>
        </div>
    }
}
