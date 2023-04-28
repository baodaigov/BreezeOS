import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Range.scss';

class RangeSlider extends Component {
    render(){
        return <input type='range' className='Range' min={this.props.min} max={this.props.max}/>
    }
}

export default RangeSlider;
