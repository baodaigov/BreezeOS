import React, { useEffect, useState } from 'react';
import { useBattery } from 'react-use';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import './assets/index.scss';

export default function BatteryLow() {
  const [active, setActive] = useState(false);

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  useEffect(() => {
    if(batteryPercent <= 5) {
      setActive(true);
    } else if(batteryState.charging){
      setActive(false);
    } else {
      setActive(false);
    }
  }, [active]);

    return (
        <div>
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div
                    className={`Window BatteryLow ${active ? 'active' : ''}`}
                    key={Math.random()}
                >
                    <TopBar>
                      <TopBarInteraction action='close' onClose={() => setActive(false)}/>
                    </TopBar>
                    <WindowBodyDefault type='critical' title={`Battery critically low: ${batteryPercent}%`} content='The battery is below the critical level and needs to charge right now.'>
                      <WindowBodyButton>
                        <button className='Button' key={Math.random()} onClick={() => setActive(false)}>OK</button>
                      </WindowBodyButton>
                    </WindowBodyDefault>
                </div>
            </Draggable>
        </div>
    )
}
