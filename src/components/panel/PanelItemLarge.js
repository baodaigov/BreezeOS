import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';
import { TaskIcon } from '../Header.js';

const PanelItemLarge = ({ type }) => {
	const [isActive, setActive] = useState('false');
	const [data, setData] = useState(TaskIcon);

	const toggle = () => {
		setActive(!isActive);
	};

	const toggleWifi = () => {
		setActive(!isActive);
		const newState = data.map(i => {
        	if (i.id == 'wifi') {
        		return {...i, icon: 'fa-solid fa-wifi-slash'};
      		}

        	return i;
    	});

    	setData(newState);
  	};

	const nightShift = () => {
		setActive(!isActive);
		document.getElementsByClassName('Desktop')[0].classList.toggle('NightShiftEnabled');
    	}

    	const toggleDarkMode = () => {
		setActive(!isActive);
		document.getElementsByClassName('Desktop')[0].classList.toggle('lightMode');
    	}

	switch (type) {
            case "wifi":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "focused" : ""}`} onClick={toggleWifi}>
                        <i className={`fa-solid ${isActive ? "fa-wifi" : "fa-wifi-slash"}`}></i>
                        {isActive ? "BreezeOS" : "Wi-Fi"}
                    </div>
                )
            case "bluetooth":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "" : "focused"}`} onClick={toggle}>
                        <i className="fa-solid fa-bluetooth"></i>
                        Bluetooth
                    </div>
                )
            case "dark-mode":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "focused" : ""}`} onClick={toggleDarkMode}>
                        <i className="fa-solid fa-circle-half-stroke"></i>
                        Dark Mode
		    </div>
                )
            case "airplane-mode":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "" : "focused"}`} onClick={toggle}>
                        <i className="fa-solid fa-plane"></i>
                        Airplane Mode
                    </div>
                )
            case "night-light":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "" : "focused"}`} onClick={nightShift}>
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

export default PanelItemLarge;
