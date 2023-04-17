import React, { Component } from 'react';

export default class SplashScreenDate extends Component {
    constructor(props){
      super(props);
      this.state = {
        curDate: null
      }
    }
  
    componentDidMount() {
      setInterval(() => {
        this.setState({
          curDate: new Date().toLocaleDateString()
        })
      }, 1000)
    }
  
    render(){
      return <p className='SplashScreenDate'>{this.state.curDate}</p>
    }
  }