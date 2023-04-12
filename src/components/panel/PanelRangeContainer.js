import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import RangeSlider from '../utils/range/Range';
import './Panel.scss';

class PanelRangeContainer extends Component {
    render(){
        return (
            <div className='PanelRangeContainer'>
                <p className='PanelRangeTitle'>{this.props.title}</p>
                <RangeSlider/>
            </div>
        )
    }
}

export default PanelRangeContainer;