import React from 'react';
import { useBattery } from 'react-use';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';

export default function UnsuitableBrowser() {

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  function close(){
    document.getElementsByClassName('UnsuitableBrowser')[0].classList.remove('active');
  }

    return (
        <div>
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div
                    className={`Window UnsuitableBrowser ${isNaN(batteryPercent) ? 'active' : ''}`}
                    style={{ width: '690px'}}
                    key={Math.random()}
                >
                    <TopBar>
                      <TopBarInteraction action='close' onClose={close}/>
                    </TopBar>
                    <WindowBodyDefault type='critical' title={`Unsuitable web browser`} content='Some features may not be supported in this browser, we recommend you to use a different one for full experience.'>
                      <WindowBodyButton>
                        <button className='Button' key={Math.random()} onClick={close}>OK</button>
                      </WindowBodyButton>
                    </WindowBodyDefault>
                </div>
            </Draggable>
        </div>
    )
}
