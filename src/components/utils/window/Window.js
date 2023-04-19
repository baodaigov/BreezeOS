import React from 'react';
import './Window.scss';
import Terminal from '../../../containers/apps/terminal'
import Firefox from '../../../containers/apps/firefox';

export default function Window(){
  return (
    <div className='WindowContainer'>
      <Terminal/>
      <Firefox/>
    </div>
  )
}
