import React, { useEffect, useRef, useState } from 'react';
import './StartMenu.scss';
import SearchMenu from './SearchMenu';
import StartApp from './StartApp';
import { TerminalStartApp } from '../../containers/apps/terminal';
import { FirefoxStartApp } from '../../containers/apps/firefox';
import { ClockStartApp } from '../../containers/apps/clock';
import { CameraStartApp } from '../../containers/apps/camera';
import { FilesStartApp } from '../../containers/apps/files';
import { CalculatorStartApp } from '../../containers/apps/calculator';
import { TextEditorStartApp } from '../../containers/apps/texteditor';
import { SoftwareStoreStartApp } from '../../containers/apps/softwarestore';

const items = [
    {
        "name": "Calendar",
        "icon": "https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg",
        "id": "calendar"
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

    function search(e){
        let val = e.target.innerText.toLowerCase();
        let matches = items.filter(v => v.name.toLowerCase().includes(val));
        console.log(matches)
    }

    document.addEventListener('keydown', e => {
        if(e.keyCode === 13){
            e.preventDefault();
        }
    })

    return (
        <div className='StartMenuWrapper'>
            <div className='StartMenu'>
                <div ref={startRef}>
                    <SearchMenu onSearch={search} value={name} onChange={e => setName(e.target.innerText)}/>
                    <div className='StartApps'>
                        <FirefoxStartApp/>
                        <ClockStartApp/>
                        <CameraStartApp/>
                        <FilesStartApp/>
                        <CalculatorStartApp/>
                        <TextEditorStartApp/>
                        <SoftwareStoreStartApp/>
                        {items.map(i => <StartApp key={i.id} icon={i.icon} name={i.name} onClick={openApp}/>)}
                        <TerminalStartApp/>
                    </div>
                </div>
            </div>
        </div>
    )
}