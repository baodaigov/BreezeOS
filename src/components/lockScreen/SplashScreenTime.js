import React, { Component } from 'react';

export default class SplashScreenTime extends Component {
    constructor(props){
      super(props);
      this.state = {
        curTime: null,
        curDate: null
      }
    }
  
    componentDidMount() {
      setInterval(() => {
        this.setState({
          curTime: new Date().toLocaleString('en-US', {
            hour: "2-digit",
            minute: "2-digit"
          }),
          curDate: new Date().toLocaleDateString()
        })
      }, 1000)
    }
  
    render(){
      return <p className='SplashScreenTitle'>{this.state.curTime}</p>
    }
  }