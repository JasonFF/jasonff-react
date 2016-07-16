import React, {Component} from 'react';
import Navbar from 'components';

export default class InsidePage extends Component {
  render() {
    return (
      <main>
        <Navbar></Navbar>
        {this.props.children}
      </main>
    )
  }
}
