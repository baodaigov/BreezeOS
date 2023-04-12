import React from 'react';
import { useBattery } from "react-use";
import './Panel.scss';

export default function Battery(){
    const batteryIcon = {
        "icon": "fa-regular fa-battery-full"
    }

    const batteryState = useBattery();

    let batteryPercent = Math.round(batteryState.level * 100);

    let batteryStatusCharge = batteryState.charging
    ? batteryIcon.icon = 'fa-regular fa-battery-bolt'
    : batteryState.level * 100 > 20
    ? batteryIcon.icon = 'fa-regular fa-battery-full'
    : batteryIcon.icon = 'fa-regular fa-battery-empty';

    return (
        <div className='PanelItem font-bold'>
            <i className={batteryIcon.icon}></i>
            <p className='PanelBatteryLevel'>{batteryPercent}%</p>
        </div>
    )
}
