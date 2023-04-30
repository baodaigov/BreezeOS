import React from 'react';
import './Window.scss';
import Terminal from '../../../containers/apps/terminal'
import Firefox from '../../../containers/apps/firefox';
import Clock from '../../../containers/apps/clock';
import Camera from '../../../containers/apps/camera';

export default function Window(){
  return (
    <div className='WindowContainer'>
      <Firefox/>
      <Clock/>
      <Camera/>
      <Terminal/>
    </div>
  )
}
