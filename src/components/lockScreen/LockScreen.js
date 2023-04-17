import React, { Component } from 'react';
import './LockScreen.scss';
import SplashScreen from './SplashScreen';

export default function LockScreen(){
    return (
        <div className='LockScreen'>
            <div className='LockScreenWrapper'>
                <SplashScreen/>
            </div>
        </div>
    )
}