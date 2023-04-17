import React, { Component } from 'react';
import { useBattery } from "react-use";
import './LockScreen.scss';
import SplashScreenTime from './SplashScreenTime';
import SplashScreenDate from './SplashScreenDate';
import LoginButton from './LoginButton';

export default function SplashScreen(){

    const batteryIcon = { "icon": "fa-regular fa-battery-full" }
    
    const batteryState = useBattery();
    
    let batteryPercent = Math.round(batteryState.level * 100);
    
    let batteryStatusCharge = batteryState.charging
        ? batteryIcon.icon = 'fa-regular fa-battery-bolt'
        : batteryIcon.icon = 'fa-regular fa-battery-full'

    return (
        <div className='SplashScreen'>
            <div>
                <SplashScreenTime/>
                <div className='SplashScreenDesc'>
                    <div className='SplashScreenItem'>
                        <SplashScreenDate/>
                    </div>
                    <div className='SplashScreenItem'>
                        <i className={`${batteryIcon.icon} SplashScreenIcon`}></i>
                        {isNaN(batteryPercent) ? '-' : batteryPercent + '%'}
                    </div>
                </div>
            </div>
            <LoginButton/>
        </div>
    )
}