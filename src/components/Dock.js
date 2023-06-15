import { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
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
    const icon = useSelector(state => state.appearance.iconTheme);
    const shellTheme = useSelector(state => state.shell.theme);

    useEffect(() => {
        setTimeout(() => {
            document.getElementsByClassName('Dock')[0].classList.add('active');
        },1000);
    }, []);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className={`Dock ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`}>
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
                <DockItem id="github" title="GitHub" icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/apps/scalable/github-desktop.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/github-desktop.svg'} redirectTo='https://github.com/baodaigov/BreezeOS'/>
                <VSCodeApp/>
            </div>
        </div>
    )
}

export default Dock;
