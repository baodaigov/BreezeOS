import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Window.scss';
import '../../../Desktop.scss';

export default class TopBarInteraction extends Component {

    render(){
        var props = this.props.action;

        switch(props){
            case "close":
                return (
                    <div className={`TopBarInteraction ${props}`} key={props} onClick={this.props.onClose}>
                        <i className="fa-solid fa-xmark fa-lg"></i>
                    </div>
                )

            case "hide":
                return (
                    <div className={`TopBarInteraction ${props}`} key={props} onClick={this.props.onHide}>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                )

            case "minMax":
                return (
                    <div className={`TopBarInteraction ${props}`} key={props} onClick={this.props.onMinMax}>
                        <i className="fa-regular fa-window-restore fa-sm"></i>
                    </div>
                )
        }
    }
}
