import React, {Component, PropTypes} from 'react';
export default class App extends Component {
  render() {
    const style = require('./App.scss');
    return (
      <div className={style.container}>
        {this.props.children}
      </div>
    )
  }
}
