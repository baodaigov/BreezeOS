import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Window.scss';
import TopBarInteraction from './TopBarInteraction';

export default class TopBar extends Component {
    render(){
        var props = this.props.type;
        switch(props){
          case "closeOnly":
            return (
                <div className='TopBar'>
                    <p className='TopBarTitle'>{this.props.title}</p>
                    <div className='TopBarInteractionContainer'>
                      <TopBarInteraction action='close'/>
                    </div>
                </div>
            )
          case "hideAndCloseOnly":
            return (
                <div className='TopBar'>
                    <p className='TopBarTitle'>{this.props.title}</p>
                    <div className='TopBarInteractionContainer'>
                      <TopBarInteraction action='hide'/>
                      <TopBarInteraction action='close'/>
                    </div>
                </div>
            )
          default:
            return (
                <div className='TopBar'>
                    <p className='TopBarTitle'>{this.props.title}</p>
                    <div className='TopBarInteractionContainer'>
                      <TopBarInteraction action='hide'/>
                      <TopBarInteraction action='minMax'/>
                      <TopBarInteraction action='close'/>
                    </div>
                </div>
            )
        }
    }
}
