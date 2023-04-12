import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';

class PanelContainer extends Component {
    render(){
        return (
            <div className='PanelContainer'>
                {this.props.children}
            </div>
        )
    }
}

export default PanelContainer;