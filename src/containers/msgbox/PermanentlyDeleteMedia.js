import React, { useEffect } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import './assets/index.scss';

export default function PermanentlyDeleteMedia(props) {
      return (
          <div>
              <Draggable positionOffset={{ x: '-50%', y: '-50%' }}>
                  <div
                      className={`Window PermanentlyDeleteMedia ${props.active}`}
                      key={Math.random()}
                  >
                      <TopBar>
                        <TopBarInteraction action='close' onClose={props.onClose}/>
                      </TopBar>
                      <WindowBodyDefault title='Permanently delete this image?' content='This action is irreversible!'>
                        <WindowBodyButton>
                          <button className='Button' key={Math.random()} onClick={props.onDelete}>Yes</button>
                          <button className='Button' key={Math.random()} onClick={props.onClose}>No</button>
                        </WindowBodyButton>
                      </WindowBodyDefault>
                  </div>
              </Draggable>
          </div>
      )
}
