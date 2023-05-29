import React, { Component } from "react";
import './Clock.scss';
import Draggable from 'react-draggable';
import ActMenu, { ActMenuSelector } from "../menu";

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date()
    };
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 1000);
  }

  componentWillMount() {
    clearInterval(this.timerId);
  }

  close(){
    document.getElementsByClassName('ClockWidget')[0].classList.remove('active');
  }

  render() {
    return (
      <Draggable>
        <div className="ClockWidget active" onContextMenu={e => e.preventDefault()}>
          {/* <ActMenu style={{ zIndex: '1', top: '120px', left: '-30px' }}>
            <ActMenuSelector title='Change style'></ActMenuSelector>
            <ActMenuSelector title='Display seconds'></ActMenuSelector>
          </ActMenu> */}
          <div className="Close" onClick={this.close}>
            <i class="fa-solid fa-xmark"></i>
          </div>
          <div
            className="Hour"
            style={{
              transform: `rotateZ(${this.state.time.getHours() * 30}deg)`
            }}
          />
          <div
            className="Min"
            style={{
              transform: `rotateZ(${this.state.time.getMinutes() * 6}deg)`
            }}
          />
          <div
            className="Sec"
            style={{
              transform: `rotateZ(${this.state.time.getSeconds() * 6}deg)`
            }}
          />
          <span className="Number twelve">12</span>
          <span className="Number three">3</span>
          <span className="Number six">6</span>
          <span className="Number nine">9</span>
        </div>
      </Draggable>
    );
  }
}
