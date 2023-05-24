import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLightMode, toggleDarkMode } from '../../reducers/settings';
import './Panel.scss';

const PanelItemLarge = ({ type }) => {
    const settingsReducer = useSelector(state => state.settings);
    const dispatch = useDispatch();

	const [isActive, setActive] = useState(true);

	const nightShift = () => {
		setActive(!isActive);
		document.getElementsByClassName('Desktop')[0].classList.toggle('NightShiftEnabled');
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
                    <>
                        {settingsReducer.themeLight ? (
                            <div className='PanelItemLarge font-bold' onClick={() => dispatch(toggleDarkMode())}>
                                <i className="fa-solid fa-circle-half-stroke"></i>
                                Dark Mode
                            </div>
                        ) : (
                            <div className='PanelItemLarge font-bold focused' onClick={() => dispatch(toggleLightMode())}>
                                <i className="fa-solid fa-circle-half-stroke"></i>
                                Dark Mode
                            </div>
                        )}
                    </>
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
