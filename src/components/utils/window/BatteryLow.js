import React from 'react';
import { useBattery } from 'react-use';
import './Window.scss';
import TopBar from './TopBar';
import WindowBodyDefault from './WindowBodyDefault';
import Draggable from 'react-draggable';

export default function BatteryLow() {

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

    return (
        <div>
            <Draggable>
                <div
                    className={`Window BatteryLow ${batteryPercent <= 5 ? 'active' : ''}`}
                    key={Math.random()}
                >
                    <TopBar type='closeOnly'/>
                    <WindowBodyDefault type='critical' title={`Battery critically low: ${batteryPercent}%`} content='The battery is below the critical level and needs to charge right now.'/>
                </div>
            </Draggable>
        </div>
    )
}
