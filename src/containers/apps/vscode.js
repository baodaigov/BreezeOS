import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openUrl, closeUrl } from '../../reducers/vscode';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/vscode.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const VSCodeApp = () => {
    const dispatch = useDispatch();
    
    const toggle = () => {
        document.getElementsByClassName('VSCodeApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('vscode')[0].classList.add('active');
            dispatch(openUrl());
        }, 500);
    };
    
	return (
		<DockItem id='vscode' class="VSCodeApp" title='Visual Studio Code' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg' onClick={toggle}/>
	)
};

export const VSCodeStartApp = () => {
    const dispatch = useDispatch();
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('VSCodeApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('vscode')[0].classList.add('active');
            dispatch(openUrl());
        }, 500);
    };

    return (
        <StartApp key='vscode' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg' name='Visual Studio Code' onClick={toggle}/>
    )
}

export default function VSCode() {
    const VSCodeWindow = () => {
        const [min, isMin] = useState(false);
        const url = useSelector(state => state.vscode.url);
        const dispatch = useDispatch();
        
        function close(){
            document.getElementsByClassName('vscode')[0].classList.remove('active');
            document.getElementById('vscode').classList.remove('clicked');
            dispatch(closeUrl());
        }
        
        function minimize(){
            document.getElementsByClassName('vscode')[0].classList.toggle('minimize');
            isMin(!min);
        }

        return (
            <>
                <TopBar title='Visual Studio Code' onDblClick={minimize}>
                    <TopBarInteraction action='hide'/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize} />
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='VSCode'>
                        <iframe src={url} title='Visual Studio Code' frameBorder='0' allowFullScreen={true}/>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='VSCodeWindow'>   
                <div
                    className='Window vscode'
                    key={Math.random()}
                >
                    <VSCodeWindow/>
                </div> 
        </div>
    )
}
