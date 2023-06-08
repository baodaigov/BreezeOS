import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import settings, { toggleAirplaneModeOff, toggleAirplaneModeOn, toggleBluetooth, toggleWifi, toggleLightMode, toggleDarkMode, enableBoldText, disableBoldText } from '../../reducers/settings';
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
                    <div className={`PanelItemLarge ${settingsReducer.wifi ? 'focused' : ''}`} onClick={() => dispatch(toggleWifi())}>
                        <i className={`fa-solid ${settingsReducer.wifi ? 'fa-wifi' : 'fa-wifi-slash'}`}></i>
                        <p className={`${settingsReducer.wifi ? 'font-medium' : 'font-bold'} activeAnimation ${settingsReducer.wifi ? 'minimize' : ''}`}>Wi-Fi</p>
                        <p className={`PanelItemName ${settingsReducer.wifi ? 'active' : ''} font-bold`}>BreezeOS</p>
                        <div className='PanelItemNext'>
                            <i className='fa-regular fa-chevron-right'></i>
                        </div>
                    </div>
                )
            case "bluetooth":
                return (
                    <div className={`PanelItemLarge ${settingsReducer.bluetooth ? 'focused' : ''}`} onClick={() => dispatch(toggleBluetooth())}>
                        <i className="fa-solid fa-bluetooth"></i>
                        <p className='font-bold'>Bluetooth</p>
                        <div className='PanelItemNext'>
                            <i className='fa-regular fa-chevron-right'></i>
                        </div>
                    </div>
                )
            case "dark-mode":
                return (
                    <>
                        {settingsReducer.themeLight ? (
                            <div className='PanelItemLarge' onClick={() => dispatch(toggleDarkMode())}>
                                <i className="fa-solid fa-circle-half-stroke"></i>
                                <p className='font-bold'>Dark Mode</p>
                            </div>
                        ) : (
                            <div className='PanelItemLarge focused' onClick={() => dispatch(toggleLightMode())}>
                                <i className="fa-solid fa-circle-half-stroke"></i>
                                <p className='font-bold'>Dark Mode</p>
                            </div>
                        )}
                    </>
                )
            case "airplane-mode":
                return (
                    <>
                        {settingsReducer.airplaneMode ? (
                            <div className='PanelItemLarge focused' onClick={() => dispatch(toggleAirplaneModeOff())}>
                                <i className="fa-solid fa-plane"></i>
                                <p className='font-bold'>Airplane Mode</p>
                            </div>
                        ) : (
                            <div className='PanelItemLarge' onClick={() => dispatch(toggleAirplaneModeOn())}>
                                <i className="fa-solid fa-plane"></i>
                                <p className='font-bold'>Airplane Mode</p>
                            </div>
                        )}
                    </>
                )
            case "night-light":
                return (
                    <div className={`PanelItemLarge ${isActive ? "" : "focused"}`} onClick={nightShift}>
                        <i className="fa-regular fa-brightness"></i>
                        <p className='font-bold'>Night Light</p>
                    </div>
                )
            case "bold-text":
                return (
                    <>
                        {settingsReducer.boldText ? (
                            <div className='PanelItemLarge focused' onClick={() => dispatch(disableBoldText())}>
                                <i className="fa-solid fa-b"></i>
                                <p className='font-bold'>Bold Text</p>
                            </div>
                        ) : (
                            <div className='PanelItemLarge' onClick={() => dispatch(enableBoldText())}>
                                <i className="fa-solid fa-b"></i>
                                <p className='font-bold'>Bold Text</p>
                            </div>
                        )}
                    </>
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
