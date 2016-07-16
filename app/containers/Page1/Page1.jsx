import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reqCities} from 'actions';
import {Button} from 'antd';

@connect(state=>({cities: state.cities}),
{reqCities})
export default class Page1 extends Component {
  componentWillMount() {
    this.props.reqCities()
  }
  render() {
    return (
      <div>
        <Button>你好</Button>
        Page1
      </div>
    )
  }
}
