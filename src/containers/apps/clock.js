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
    setInterval(() => {
        setCurTime(new Date().toLocaleString('vi-VN', {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }));
    }, 1000);

    return (
        <div className='ClockItem'>
            <div className='ClockInfo'>
                <p className='ClockTitle font-semibold'>{props.title}</p>
                <p className='ClockDesc'>{props.description}</p>
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
                                <ClockItem title='Indochina Time (GMT+7)' description='Current timezone'/>
                            </div>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
