import React, { Component } from 'react';
import './Window.scss';

export default class WindowBodyButton extends Component {

  render(){
    return (
      <div className='WindowBodyButton'>
        {this.props.children}
      </div>
    )
  }
}
