import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Window.scss';
import TopBarInteraction from './TopBarInteraction';

export default class TopBar extends Component {
    render(){
      return (
        <div className='TopBar'>
            <p className='TopBarTitle'>{this.props.title}</p>
            <div className='TopBarInteractionContainer'>
              {this.props.children}
            </div>
        </div>
    )
    }
}
