import React from 'react';
import { useSelector } from 'react-redux';
import './LockScreen.scss';
import SplashScreen from './SplashScreen';

export default function LockScreen(){
    const wallpaperId = useSelector(state => state.wallpaper.id);

    return (
        <div className={`LockScreen ${wallpaperId}`}>
            <div className='LockScreenWrapper'>
                <SplashScreen/>
            </div>
        </div>
    )
}