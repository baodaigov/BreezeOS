import React, { useEffect, useRef, useState } from 'react';
import './StartMenu.scss';
import SearchMenu from './SearchMenu';
import StartApp from './StartApp';
import { TerminalStartApp } from '../../containers/apps/terminal';

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



function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function openApp(){
    document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
    document.getElementsByClassName('Header')[0].classList.add('active');
    document.getElementsByClassName('DesktopBody')[0].classList.add('active');
}

export default function StartMenu(){
    const startRef = useRef(null);
    useOutsideAlerter(startRef);

    const [name, setName] = useState('');
    const [item, setItem] = useState([]);

    function search(e){
        let val = e.target.innerText.toLowerCase();
        let matches = items.filter(v => v.name.toLowerCase().includes(val));
        console.log(matches)
    }

    return (
        <div className='StartMenuWrapper'>
            <div className='StartMenu' ref={startRef}>
                <SearchMenu onSearch={search} value={name} onChange={e => setName(e.target.innerText)}/>
                <div className='StartApps'>
                    {items.map(i => <StartApp key={i.id} icon={i.icon} name={i.name} onClick={openApp}/>)}
                    <TerminalStartApp/>
                </div>
            </div>
        </div>
    )
}