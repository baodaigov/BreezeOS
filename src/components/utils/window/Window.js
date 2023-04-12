import React from 'react';
import { useBattery } from 'react-use';
import './Window.scss';
import TopBar from './TopBar';
import WindowBody from './WindowBody';
import Draggable from 'react-draggable';

export default function Window() {

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

    return (
        <div>
            <Draggable>
                <div
                    className='Window'
                    key={Math.random()}
                >
                    <TopBar/>
                    <WindowBody></WindowBody>
                </div>
            </Draggable>
        </div>
    )
}
