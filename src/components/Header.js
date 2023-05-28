import React, { useEffect } from 'react';
import Panel from './panel/Panel';
import Time from '../header/Time';
import Task from '../header/Task';
import Home from '../header/Home';
import { useBattery } from 'react-use';

const TaskIcon = [
    {
        "id": "wifi", "icon": "fa-solid fa-wifi"
    },
    {
        "id": "volume", "icon": "fa-solid fa-volume"
    }
]

const Header = () => {
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
                {TaskIcon.map(i => <i key={i.id} className={i.icon}></i>)}
            </Task>
            <Panel style={{ top: "45px", right: "0" }}/>
        </div>
    )
}

export default Header;
