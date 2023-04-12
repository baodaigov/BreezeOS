import React, { Component } from 'react';
import './Window.scss';

export default class WindowBodyButton extends Component {

  close(e){
      document.getElementsByClassName('Window')[0].classList.remove('active');
  }

  render(){
    var code = this.props.code;
    switch(code){
        case "0":
          return (
            <div className='WindowBodyButton'>
              <button className='Button' key='ok' onClick={e=>this.close(e)}>OK</button>
            </div>
          )
        case "1":
          return (
            <div className='WindowBodyButton'>
              <button className='Button' key='ok'>OK</button>
              <button className='Button' key='cancel'>Cancel</button>
            </div>
          )
        case "2":
          return (
            <div className='WindowBodyButton'>
              <button className='Button' key='abort'>Abort</button>
              <button className='Button' key='retry'>Retry</button>
              <button className='Button' key='ignore'>Ignore</button>
            </div>
          )
        case "3":
          return (
            <div className='WindowBodyButton'>
              <button className='Button' key='cancel'>Cancel</button>
              <button className='Button' key='no'>No</button>
              <button className='Button' key='yes'>Yes</button>
            </div>
          )
        case "4":
          return (
            <div className='WindowBodyButton'>
              <button className='Button' key='no'>No</button>
              <button className='Button' key='yes'>Yes</button>
            </div>
          )
        case "5":
          return (
            <div className='WindowBodyButton'>
              <button className='Button' key='cancel'>Cancel</button>
              <button className='Button' key='retry'>Retry</button>
            </div>
          )
    }
  }
}
