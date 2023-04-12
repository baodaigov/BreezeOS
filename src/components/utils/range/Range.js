import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Range.scss';

class RangeSlider extends Component {
    render(){
        return <input type='range' className='Range' value={this.props.value} min={this.props.minvalue} max={this.props.maxvalue}/>
    }
}

export default RangeSlider;
