import { useEffect, useState, useRef } from 'react';
import Wallpaper from './components/Wallpaper'
import './Desktop.scss';
import Clock from './components/utils/widget/Clock';
import Window from './components/utils/window/Window';
import WindowDefault from './components/utils/window/WindowDefault';

const DesktopBody = () => {
    return (
            <div className='DesktopBody'>
                <Clock/>
                <Window/>
                <WindowDefault/>
            </div>
    )
}

export default DesktopBody;
