import { useEffect } from 'react';
import './Dock.scss';
import DockItem from './DockItem';
import { TerminalApp } from '../containers/apps/terminal';

const items = [
    {
        "name": "Firefox",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg",
        "id": "firefox"
    },
    {
        "name": "Calendar",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg",
        "id": "calendar"
    },
    {
        "name": "Clock",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg",
        "id": "clock"
    },
    {
        "name": "Camera",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg",
        "id": "camera"
    },
    {
        "name": "Files",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/file-roller.svg",
        "id": "files"
    },
    {
        "name": "Calculator",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-calculator.svg",
        "id": "calculator"
    },
    {
        "name": "Text Editor",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg",
        "id": "texteditor"
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

    return (
        <div className='Dock'>
	    {items.map(item =>
                <DockItem id={item.id} title={item.name} icon={item.icon}/>
            )}
	    <TerminalApp/>
	    <a href='https://github.com/baodaigov'>
                <DockItem id="github" title="GitHub" icon="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"/>
            </a>
            <a href='https://github.dev/baodaigov/BreezeOS'>
                <DockItem id="vscode" title="Fork this repository" icon="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/visual-studio-code.svg"/>
            </a>
        </div>
    )
}

export default Dock;
