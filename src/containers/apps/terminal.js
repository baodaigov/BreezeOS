import React, { useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/terminal.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const TerminalApp = () => {
    const toggle = () => {
        document.getElementsByClassName('TerminalApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('terminal')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='terminal' class="TerminalApp" title='Terminal' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg' onClick={toggle}/>
	)
};

export const TerminalStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('TerminalApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('terminal')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='terminal' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg' name='Terminal' onClick={toggle}/>
    )
}

export default function Terminal() {
    function close(){
        document.getElementsByClassName('terminal')[0].classList.remove('active');
        document.getElementById('terminal').classList.remove('clicked');
    }

    function minimize(){
        document.getElementsByClassName('terminal')[0].classList.toggle('minimize');

        return <i className="fa-regular fa-window-maximize"></i>
    }

    return (
        <div className='terminalWindow'>   
                <div
                    className='Window terminal minimize'
                    key={Math.random()}
                >
                    <TopBar title='Terminal' onDblClick={minimize}>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action='minMax' onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </TopBar>
                    <WindowBody>
                        <div className='Terminal'>
                            <pre>Welcome to BreezeOS (GNU/Linux 6.2.1 x86_64)</pre>
                            <pre id='input'>[localhost@BreezeOS]$ 
                            <input type='text' spellCheck='false'/>
                            </pre>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
