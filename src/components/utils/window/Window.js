import React from 'react';
import './Window.scss';
import Terminal from '../../../containers/apps/terminal'

export default function Window(){
  return (
    <div className='WindowContainer'>
      <Terminal/>
    </div>
  )
}
