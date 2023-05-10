import { useEffect, useState } from 'react';
import './Dock.scss';
import DockItem from './DockItem';
import { TerminalApp } from '../containers/apps/terminal';
import { FirefoxApp } from '../containers/apps/firefox';
import { ClockApp } from '../containers/apps/clock';
import { CameraApp } from '../containers/apps/camera';
import { FilesApp } from '../containers/apps/files';
import { CalculatorApp } from '../containers/apps/calculator';
import { TextEditorApp } from '../containers/apps/texteditor';

const items = [
    {
        "name": "Calendar",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg",
        "id": "calendar"
    },
    {
        "name": "Software Store",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/software-store.svg",
        "id": "softwarestore"
    },
]

const Dock = () => {
    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName('Dock')[0].classList.add('active');
        },1000);
    }, []);

    const [isActive, setActive] = useState('false');

    const toggle = () => {
  		setActive(!isActive);
  	};

    return (
        <div className='Dock'>
        <FirefoxApp/>
        <ClockApp/>
        <CameraApp/>
        <FilesApp/>
        <CalculatorApp/>
        <TextEditorApp/>
	        {items.map(item =>
                <DockItem id={item.id} class={`${isActive ? "" : "clicked"}`} title={item.name} icon={item.icon} onClick={toggle}/>
            )}
	    <TerminalApp/>
	    <a href='https://github.com/baodaigov/BreezeOS'>
                <DockItem id="github" title="GitHub" icon="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"/>
            </a>
            <a href='https://github.dev/baodaigov/BreezeOS'>
                <DockItem id="vscode" title="Fork this repository" icon="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"/>
            </a>
        </div>
    )
}

export default Dock;
