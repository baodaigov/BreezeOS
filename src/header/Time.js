import React, { Component } from 'react'

class Time extends Component {
  constructor(props){
    super(props);
    this.state = {
      curTime: null,
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString('en-US', {
          hour: "2-digit",
          minute: "2-digit"
        })
      })
    }, 1000)
  }

  render(){
    return (
      <div className='Time Header-item'>
          <p>{this.state.curTime}</p>
      </div>
    )
  }
}

export default Time;