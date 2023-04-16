import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/terminal.scss';

export const TerminalApp = () => {
	return (
		<DockItem id='terminal' title='Terminal' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg' onClick={openTerminal}/>
	)
};

export const openTerminal = () => {
      setTimeout(() => {
          document.getElementsByClassName('terminal')[0].classList.add('active');
      },1000);
};

export default function Terminal() {
    return (
        <div>   
                <div
                    className='Window terminal'
                    key={Math.random()}
                >
                    <TopBar title='Terminal'/>
                    <WindowBody>
                        <div className='Terminal'>
                            <pre id='input'>Welcome to BreezeOS (GNU/Linux 6.2.1 x86_64)</pre>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
