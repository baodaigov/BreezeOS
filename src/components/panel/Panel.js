import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';
import PanelTop from './PanelTop';
import PanelBottom from './PanelBottom';

class Panel extends Component {
    render(){
        return (
            <div className='Panel' style={this.props.style}>
                <PanelTop/>
                <PanelBottom/>
            </div>
        )
    }
}

export default Panel;