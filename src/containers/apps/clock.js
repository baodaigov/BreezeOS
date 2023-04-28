import React, { useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/clock.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const ClockApp = () => {

    const toggle = () => {
        document.getElementsByClassName('ClockApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('clock')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='clock' class="ClockApp" title='Clock' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg' onClick={toggle}/>
	)
};

export const ClockStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('ClockApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('clock')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='clock' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg' name='Clock' onClick={toggle}/>
    )
}

export const ClockItem = (props) => {
    const [curTime, setCurTime] = useState(null);
    const [curDate, setCurDate] = useState(null);
    setInterval(() => {
        setCurTime(new Date().toLocaleString('vi-VN', {
            timeZone: `${props.timeZone}`,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }));

        setCurDate(new Date().toLocaleDateString('en-US', {
            timeZone: `${props.timeZone}`,
            dateStyle: "full"
        }));
    }, 1000);

    return (
        <div className='ClockItem'>
            <div className='ClockInfo'>
                <p className='ClockTitle font-semibold'>{props.title}</p>
                <p className='ClockDesc'>{curDate}</p>
            </div>
            <div>
                <div className='ClockTime font-bold'>
                    <p>{curTime}</p>
                </div>
            </div>
        </div>
    )
}

export default function Clock() {
    function close(){
        document.getElementsByClassName('clock')[0].classList.remove('active');
        document.getElementById('clock').classList.remove('clicked');
    }

    function minimize(){
        document.getElementsByClassName('clock')[0].classList.toggle('minimize');
    }

    return (
        <div className='ClockWindow'>   
                <div
                    className='Window clock'
                    key={Math.random()}
                >
                    <TopBar title='Clock' onDblClick={minimize}>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action='minMax' onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </TopBar>
                    <WindowBody>
                        <div className='Clock'>
                            <div className='ClockItems'>
                                <ClockItem title='Ho Chi Minh City, Vietnam' timeZone='Asia/Ho_Chi_Minh'/>
                                <ClockItem title='New York, USA' timeZone='America/New_York'/>
                                <ClockItem title='London, United Kingdom' timeZone='Europe/London'/>
                                <ClockItem title='Tokyo, Japan' timeZone='Asia/Tokyo'/>
                                <ClockItem title='Moscow, Russia' timeZone='Europe/Moscow'/>
                            </div>
                            <div className='ClockMenu'>
                                <div className='ClockMenuInside'>
                                    <div className='ClockMenuItem active'>
                                        <i className="fa-regular fa-globe"></i>
                                        <p>World Clock</p>
                                    </div>
                                    <div className='ClockMenuItem'>
                                        <i className="fa-regular fa-alarm-clock"></i>
                                        <p>Alarm</p>
                                    </div>
                                    <div className='ClockMenuItem'>
                                        <i className="fa-regular fa-stopwatch"></i>
                                        <p>Stopwatch</p>
                                    </div>
                                    <div className='ClockMenuItem'>
                                        <i className="fa-regular fa-timer"></i>
                                        <p>Timer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
