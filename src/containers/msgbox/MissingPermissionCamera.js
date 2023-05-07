import React, { useEffect } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import './assets/index.scss';

export default function MissingPermissionCamera() {

  function close(){
    document.getElementsByClassName('MissingPermissionCamera')[0].classList.remove('active');
  }

    return (
        <div>
            <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                <div
                    className={'Window MissingPermissionCamera'}
                    key={Math.random()}
                >
                    <TopBar>
                      <TopBarInteraction action='close' onClose={close}/>
                    </TopBar>
                    <WindowBodyDefault type='exclamation' title='Missing permission' content='Please grant permission in order to take photos and videos.'>
                      <WindowBodyButton>
                        <button className='Button' key={Math.random()}>Open Settings...</button>
                        <button className='Button' key={Math.random()} onClick={close}>OK</button>
                      </WindowBodyButton>
                    </WindowBodyDefault>
                </div>
            </Draggable>
        </div>
    )
}
