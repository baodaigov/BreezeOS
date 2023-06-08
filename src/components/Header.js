import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Time from '../header/Time';
import Task from '../header/Task';
import Home from '../header/Home';
import { useBattery } from 'react-use';

const Header = props => {
    const settingsReducer = useSelector(state => state.settings);
    const batteryChargingStatus = useSelector(state => state.battery.charging);
    const [width, setWidth] = useState('900');

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
        <div className='Header' style={{ width: `${width}px` }}>
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
            </div>
        </div>
    )
}

export default Header;
