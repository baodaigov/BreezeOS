import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setActive, setHide} from "../../reducers/apps/terminal";
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/terminal.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const TerminalApp = () => {
    const isActive = useSelector(state => state.appsTerminal.active);
    const isHide = useSelector(state => state.appsTerminal.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);

    document.addEventListener('keydown', (e) => {
        if(e.ctrlKey && e.keyCode === 57){
            dispatch(setActive(true));
        }
    });

    useEffect(() => {
        if(isActive){
            document.getElementsByClassName('TerminalApp')[0].classList.add('clicked');
            setTimeout(() => document.getElementsByClassName('terminal')[0].classList.add('active'), 500);
        } else {
            document.getElementsByClassName('TerminalApp')[0].classList.remove('clicked');
            document.getElementsByClassName('terminal')[0].classList.remove('active');
        }
        if(isHide){
            document.getElementsByClassName('TerminalApp')[0].classList.add('hide');
            document.getElementsByClassName('terminal')[0].classList.add('hide');
        } else {
            document.getElementsByClassName('TerminalApp')[0].classList.remove('hide');
            document.getElementsByClassName('terminal')[0].classList.remove('hide');
        }
    }, [isActive, isHide]);
    
	return (
        <DockItem id='terminal' class="TerminalApp" title='Terminal' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/terminal.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg'} onClick={() => isHide ? dispatch(setHide(false)) : dispatch(setActive(true))}/>
	)
};

export const TerminalStartApp = () => {
    const isHide = useSelector(state => state.appsTerminal.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        if(isHide){
            dispatch(setHide(false));
        } else {
            dispatch(setActive(true));
        }
    };

    return (
        <StartApp key='terminal' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/terminal.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/utilities-x-terminal.svg'} name='Terminal' onClick={toggle}/>
    )
}

export default function Terminal() {
    const dispatch = useDispatch();
    const TerminalWindow = () => {

        const [min, isMin] = useState(true);
    
        function minimize(){
            document.getElementsByClassName('terminal')[0].classList.toggle('minimize');
            isMin(!min)
        }

        return (
            <>
                <TopBar title='Terminal' onDblClick={minimize}>
                    <TopBarInteraction action='hide' onHide={() => dispatch(setHide(true))}/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={() => dispatch(setActive(false))}/>
                </TopBar>
                <WindowBody>
                    <div className='Terminal'>
                        <pre>Welcome to BreezeOS (GNU/Linux 6.2.1 x86_64)</pre>
                        <pre id='input'>&#91;localhost@breezeos&#93;$ 
                            <input type='text' spellCheck='false'/>
                        </pre>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='terminalWindow'>   
                <div
                    className='Window terminal minimize'
                    key={Math.random()}
                >
                    <TerminalWindow/>
                </div> 
        </div>
    )
}
