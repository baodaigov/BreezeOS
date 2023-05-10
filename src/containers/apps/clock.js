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

export const ClockMenu = () => {
    const [translateX, setTranslateX] = useState('');
    const [width, setWidth] = useState('103px');
    const [value, setValue] = useState('1');
    const ClockItems = document.getElementsByClassName('ClockItems')[0];

    function worldClockTab(){
        setTranslateX('translate(0)');
        setWidth('103px');
        setValue('1');
    }

    function alarmTab(){
        setTranslateX('translate(107.5px)');
        setWidth('70px');
        setValue('2');
    }

    function stopwatchTab(){
        setTranslateX('translate(182px)');
        setWidth('97px');
        setValue('3');
    }

    function timerTab(){
        setTranslateX('translate(283px)');
        setWidth('72px');
        setValue('4');
    }

    return (
        <div className='ClockMenu' value={value}>
            <div className='ClockMenuInside'>
                <div className='ClockMenuItem world-clock' onClick={worldClockTab}>
                    <i className="fa-regular fa-globe"></i>
                    <p>World Clock</p>
                </div>
                <div className='ClockMenuItem alarm-clock' onClick={alarmTab}>
                    <i className="fa-regular fa-alarm-clock"></i>
                    <p>Alarm</p>
                </div>
                <div className='ClockMenuItem stopwatch' onClick={stopwatchTab}>
                    <i className="fa-regular fa-stopwatch"></i>
                    <p>Stopwatch</p>
                </div>
                <div className='ClockMenuItem timer' onClick={timerTab}>
                    <i className="fa-regular fa-timer"></i>
                    <p>Timer</p>
                </div>
                <div className='ClockSlider' style={{ width: width, transform: translateX }}></div>
            </div>
        </div>
    )
}

export default function Clock() {
    const ClockWindow = () => {
        const [min, isMin] = useState(false);
    
        function close(){
            document.getElementsByClassName('clock')[0].classList.remove('active');
            document.getElementById('clock').classList.remove('clicked');
        }
    
        function minimize(){
            document.getElementsByClassName('clock')[0].classList.toggle('minimize');
            isMin(!min)
        }

        return (
            <>
                <TopBar title='Clock' onDblClick={minimize}>
                    <TopBarInteraction action='hide'/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='Clock'>
                        <div className='ClockItems'>
                            <div className='world-clock'>
                                <ClockItem title='Ho Chi Minh City, Vietnam' timeZone='Asia/Ho_Chi_Minh'/>
                                <ClockItem title='London, United Kingdom' timeZone='Europe/London'/>
                            </div>
                        </div>
                        <ClockMenu/>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='ClockWindow'>   
                <div
                    className='Window clock'
                    key={Math.random()}
                >
                    <ClockWindow/>
                </div> 
        </div>
    )
}