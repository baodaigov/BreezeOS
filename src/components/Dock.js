import { useEffect, useState } from 'react';
import './Dock.scss';
import DockItem from './DockItem';
import { TerminalApp } from '../containers/apps/terminal';
import { FirefoxApp } from '../containers/apps/firefox';
import { ClockApp } from '../containers/apps/clock';
import { SettingsApp } from '../containers/apps/settings';
import { CameraApp } from '../containers/apps/camera';
import { FilesApp } from '../containers/apps/files';
import { CalculatorApp } from '../containers/apps/calculator';
import { TextEditorApp } from '../containers/apps/texteditor';
import { SoftwareStoreApp } from '../containers/apps/softwarestore';
import { CalendarApp } from '../containers/apps/calendar';
import { VSCodeApp } from '../containers/apps/vscode';

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
            <CalendarApp/>
            <SettingsApp/>
            <ClockApp/>
            <CameraApp/>
            <FilesApp/>
            <CalculatorApp/>
            <TextEditorApp/>
            <TerminalApp/>
            <SoftwareStoreApp/>
            <a href='https://github.com/baodaigov/BreezeOS'>
                <DockItem id="github" title="GitHub" icon="https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg"/>
            </a>
            <VSCodeApp/>
        </div>
    )
}

export default Dock;
