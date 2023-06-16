import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {activePanel, inactivePanel} from '../reducers/panel';
import Time from '../header/Time';
import Task from '../header/Task';
import Home from '../header/Home';
import Panel from './panel/Panel'
import { useBattery } from 'react-use';
import DateNTime from "../header/DateNTime";
import AppMenu from "../header/AppMenu";

const Header = props => {
    const dispatch = useDispatch();
    const panelActive = useSelector(state => state.panel.active);
    const panelType = useSelector(state => state.panel.type);
    const settingsReducer = useSelector(state => state.settings);
    const batteryChargingStatus = useSelector(state => state.battery.charging);
    const shellTheme = useSelector(state => state.shell.theme);
    const [width, setWidth] = useState('900');
    
    function useOutsidePanel(ref) {
        useEffect(() => {
            /**
                * Alert if clicked on outside of element
            */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    dispatch(inactivePanel());
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const panelRef = useRef(null);
    useOutsidePanel(panelRef);

    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.add('active');
        },1000);
        
        if(batteryChargingStatus){
            document.getElementsByClassName('default')[0].classList.remove('active');
            setWidth('580');
            setTimeout(() => {
                document.getElementsByClassName('charging')[0].classList.add('active');
            }, 200);
            setTimeout(() => {
                document.getElementsByClassName('charging')[0].classList.remove('active');
                setWidth('900');
            }, 2350);
            setTimeout(() => {
                document.getElementsByClassName('default')[0].classList.add('active');
            }, 2500);
        }
        
        if(batteryPercent <= 10){
            document.getElementsByClassName('default')[0].classList.remove('active');
            setWidth('580');
            setTimeout(() => {
                document.getElementsByClassName('lowbattery')[0].classList.add('active');
            }, 200);
            setTimeout(() => {
                document.getElementsByClassName('lowbattery')[0].classList.remove('active');
                setWidth('900');
            }, 2350);
            setTimeout(() => {
                document.getElementsByClassName('default')[0].classList.add('active');
            }, 2500);
        }
    }, [batteryChargingStatus]);

    return (
        <div className={`Header ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`} style={{ width: `${width}px` }}>
            <div className='lowbattery' key='lowbattery'>
                <div className='LowBatteryText'>
                    <p className='font-bold'>Low Battery</p>
                </div>
                <div className='BatteryLevel'>
                    <p className='BatteryLevelText font-bold'>{isNaN(batteryPercent) ? '-' : batteryPercent + '%'}</p>
                </div>
            </div>
            <div className='charging' key='charging'>
                <div className='ChargingText'>
                    <p className='font-bold'>{batteryPercent === 100 ? 'Fully Charged' : 'Charging'}</p>
                </div>
                <div className='BatteryLevel'>
                    <p className='BatteryLevelText font-bold'>{isNaN(batteryPercent) ? '-' : batteryPercent + '%'}</p>
                </div>
            </div>
            <div className='default active' key='default'>
                <div className='Header-left'>
                    <Home/>
                    {shellTheme !== 'WhiteSur' ? <Time/> : ''}
                    {shellTheme === 'WhiteSur' ? <AppMenu/> : ''}
                </div>
                <div className='Header-right'>
                    {shellTheme !== 'WhiteSur' ? (
                        <Task>
                            <div className={`BatteryStatus ${batteryPercent <= 10 ? "low-battery" : ""}`}>
                                <p className={`BatteryStatusLevel font-bold ${batteryState.charging ? "in-charge" : ""}`}>{isNaN(batteryPercent) ? '-' : batteryPercent + '%'}</p>
                            </div>
                            {settingsReducer.airplaneMode ? <i key={Math.random()} className='fa-solid fa-plane'></i> : ''}
                            {settingsReducer.wifi ? <i key={Math.random()} className='fa-solid fa-wifi'></i> : ''}
                            <i key={Math.random()} className='fa-solid fa-volume'></i>
                        </Task>
                    ) : ''}
                    {shellTheme === 'WhiteSur' ? (
                        <>
                            <div className={`Header-item ${panelActive ? 'active' : ''}`} onMouseDown={() => panelActive ? '' : dispatch(activePanel())} ref={panelRef}>
                                <i className='fa-regular fa-chevron-down'></i>
                                <Panel style={{ height: panelType === 'default' ? '340px' : panelType === 'wifi' ? '545px' : panelType === 'bluetooth' ? '545px' : '340px' }}/>
                            </div>
                            <div className={`Header-item ${settingsReducer.bluetooth ? '' : 'disabled'}`}>
                                <i className='fa-regular fa-bluetooth'></i>
                            </div>
                            <div className='Header-item'>
                                {batteryChargingStatus ? <i className='fa-regular fa-battery-bolt'></i> : <i className='fa-regular fa-battery-full'></i>}
                            </div>
                            <div className={`Header-item ${settingsReducer.wifi ? '' : 'disabled'}`}>
                                {settingsReducer.wifi ? <i className='fa-regular fa-wifi'></i> : <i className='fa-regular fa-wifi-slash'></i>}
                            </div>
                            <div className='Header-item'>
                                <i className='fa-regular fa-brightness'></i>
                            </div>
                            <div className='Header-item'>
                                <i className='fa-regular fa-volume'></i>
                            </div>
                            <DateNTime/>
                        </>
                    ) : ''}
                </div>
            </div>
        </div>
    )
}

export default Header;
