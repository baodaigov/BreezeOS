import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Panel from './panel/Panel';
import Time from '../header/Time';
import Task from '../header/Task';
import Home from '../header/Home';
import { useBattery } from 'react-use';

const Header = () => {
    const settingsReducer = useSelector(state => state.settings);

    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.add('active');
        },1000);
    }, []);

    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    return (
        <div className='Header font-bold'>
            <div className='Header-left'>
              <Home/>
              <Time/>
            </div>
            <Task>
                <div className={`BatteryStatus ${batteryPercent <= 10 ? "low-battery" : ""}`}>
                    <p className={`BatteryStatusLevel font-bold ${batteryState.charging ? "in-charge" : ""}`}>{isNaN(batteryPercent) ? '-' : batteryPercent + '%'}</p>
                </div>
                {settingsReducer.airplaneMode ? <i key={Math.random()} className='fa-solid fa-plane'></i> : ''}
                {settingsReducer.bluetooth ? <i key={Math.random()} className='fa-solid fa-bluetooth'></i> : ''}
                {settingsReducer.wifi ? <i key={Math.random()} className='fa-solid fa-wifi'></i> : ''}
                <i key={Math.random()} className='fa-solid fa-volume'></i>
            </Task>
            <Panel style={{ top: "45px", right: "0" }}/>
        </div>
    )
}

export default Header;
