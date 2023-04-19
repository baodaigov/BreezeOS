import React, { useState, useEffect } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/firefox.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const FirefoxApp = () => {

    const [isActive, setActive] = useState('false');
    
    const toggle = () => {
        setActive(!isActive);
        setTimeout(() => {
            document.getElementsByClassName('firefox')[0].classList.toggle('active');
        }, 500);
    };
    
	return (
		<DockItem id='firefox' class={`${isActive ? "" : "clicked"}`} title='Firefox' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg' onClick={toggle}/>
	)
};

export const FirefoxStartApp = () => {

    const [isActive, setActive] = useState('false');
    
    const toggle = () => {
        setActive(!isActive);
        setTimeout(() => {
            document.getElementsByClassName('firefox')[0].classList.add('active');
        }, 500);
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
    };

    return (
        <StartApp key='firefox' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg' name='Firefox' onClick={toggle}/>
    )
}

export default function Firefox() {
    const [url, setUrl] = useState('');

    function close(){
        document.getElementsByClassName('firefox')[0].classList.remove('active');
        document.getElementById('firefox').classList.remove('clicked');
    }

    function minimize(){
        document.getElementsByClassName('firefox')[0].classList.toggle('minimize');
    }

    return (
        <div className='FirefoxWindow'>   
                <div
                    className='Window firefox'
                    key={Math.random()}
                >
                    <TopBar title='Firefox' onDblClick={minimize}>
                        <div className='TabBarWrapper'>
                            <div className='TabBar'>
                                <div className='TabBarItem'>
                                    <p>New Tab</p>
                                    <div className='CloseButton' onClick={close}>
                                        <i class="fa-regular fa-xmark"></i>
                                    </div>
                                </div>
                                <div className='TabBarItem TabSearch' style={{ width: '100vw' }} contentEditable='true'></div>
                            </div>
                        </div>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action='minMax' onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </TopBar>
                    <WindowBody>
                        <div className='Firefox'>
                            <iframe id='iFrameFF' width='100%' height='100%' src='https://www.google.com/?igu=1' frameBorder='0'/>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
