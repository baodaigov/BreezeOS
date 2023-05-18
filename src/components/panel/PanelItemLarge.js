import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';

const PanelItemLarge = ({ type }) => {
	const [isActive, setActive] = useState(true);

	const nightShift = () => {
		setActive(!isActive);
		document.getElementsByClassName('Desktop')[0].classList.toggle('NightShiftEnabled');
    }

    	const toggleDarkMode = () => {
            setActive(!isActive);
            document.getElementsByClassName('Desktop')[0].classList.toggle('lightMode');
    	}

    const boldText = () => {
        setActive(!isActive);
		document.getElementsByClassName('Desktop')[0].classList.toggle('isBold');
    }

	switch (type) {
            case "wifi":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "focused" : ""}`} onClick={() => setActive(!isActive)}>
                        <i className={`fa-solid ${isActive ? "fa-wifi" : "fa-wifi-slash"}`}></i>
                        {isActive ? "BreezeOS" : "Wi-Fi"}
                    </div>
                )
            case "bluetooth":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "" : "focused"}`} onClick={() => setActive(!isActive)}>
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
                    <div className={`PanelItemLarge font-bold ${isActive ? "" : "focused"}`} onClick={() => setActive(!isActive)}>
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
            case "bold-text":
                return (
                    <div className={`PanelItemLarge font-bold ${isActive ? "" : "focused"}`} onClick={boldText}>
                        <i className="fa-solid fa-b"></i>
                        Bold Text
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
