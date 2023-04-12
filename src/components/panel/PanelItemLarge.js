import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';
import '../../Desktop.scss'

class PanelItemLarge extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }

    toggle(e){
        this.setState({active: !this.state.active});
    }

    toggleWifi(e){
        this.setState({active: !this.state.active});
        document.getElementsByClassName('Task')[0].classList.toggle('disableWifi');
    }

    nightShift(e){
        this.setState({active: !this.state.active})
        document.getElementsByClassName('Desktop')[0].classList.toggle('NightShiftEnabled');
    }
    
    toggleDarkMode(e){
        this.setState({active: !this.state.active});
        document.getElementsByClassName('Desktop')[0].classList.toggle('lightMode');
    }

    render(){
        var props = this.props.type;

        switch (props) {
            case "wifi":
                return (
                    <div className={`PanelItemLarge font-bold ${this.state.active ? "" : "focused"}`} onClick={e => this.toggleWifi(e)}>
                        <i className={`fa-solid ${this.state.active ? "fa-wifi-slash" : "fa-wifi"}`}></i>
                        {this.state.active ? "Wi-Fi" : "BreezeOS"}
                    </div>
                )
            case "bluetooth":
                return (
                    <div className={`PanelItemLarge font-bold ${this.state.active ? "focused" : ""}`} onClick={e => this.toggle(e)}>
                        <i className="fa-solid fa-bluetooth"></i>
                        Bluetooth
                    </div>
                )
            case "dark-mode":
                return (
                    <div className={`PanelItemLarge font-bold ${this.state.active ? "" : "focused"}`} onClick={e => this.toggleDarkMode(e)}>
                        <i className="fa-solid fa-circle-half-stroke"></i>
                        Dark Mode
                    </div>
                )
            case "airplane-mode":
                return (
                    <div className={`PanelItemLarge font-bold ${this.state.active ? "focused" : ""}`} onClick={e => this.toggle(e)}>
                        <i className="fa-solid fa-plane"></i>
                        Airplane Mode
                    </div>
                )
            case "night-light":
                return (
                    <div className={`PanelItemLarge font-bold ${this.state.active ? "focused" : ""}`} onClick={e => this.nightShift(e)}>
                        <i className="fa-regular fa-brightness"></i>
                        Night Light
                    </div>
                )
            default:
                return (
                    <div className='PanelItemLarge font-bold'>
                        Please define a specific type.
                    </div>
                )
        }
    }
}

export default PanelItemLarge;