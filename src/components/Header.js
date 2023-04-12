import React, { useEffect } from 'react';
import Time from '../header/Time';
import Task from '../header/Task';
import Home from '../header/Home';
import { useBattery } from 'react-use';

const Header = () => {
    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.add('active');
        },1000);
    }, []);

    const classes = [
        {
            "icon": "fa-solid fa-wifi"
        },
        {
            "icon": "fa-solid fa-volume"
        }
    ]

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
                    <p className={`BatteryStatusLevel font-bold ${batteryState.charging ? "in-charge" : ""}`}>{batteryPercent}%</p>
                </div>
                {classes.map(i => <i className={i.icon}></i>)}
            </Task>
        </div>
    )
}

export default Header;
