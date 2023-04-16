import React, {useRef} from 'react';
import { useBattery } from 'react-use';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';

export default function BatteryNotFound() {

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  function close(){
    document.getElementsByClassName('BatteryNotFound')[0].classList.remove('active');
  }

    return (
        <div>
            <Draggable>
                <div
                    className={`Window BatteryNotFound ${isNaN(batteryPercent) ? 'active' : ''}`}
                    style={{ width: '470px'}}
                    key={Math.random()}
                >
                    <TopBar type='closeOnly'/>
                    <WindowBodyDefault type='critical' title={`Battery not found.`} content='Please switch to another browser that allows to use the battery level.'>
                      <WindowBodyButton>
                        <button className='Button' key={Math.random()} onClick={close}>OK</button>
                      </WindowBodyButton>
                    </WindowBodyDefault>
                </div>
            </Draggable>
        </div>
    )
}
