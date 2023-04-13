import React from 'react';
import './Window.scss';
import BatteryLow from '../../../containers/msgbox/BatteryLow'

export default function WindowDefault(){
  return (
    <div className='WindowDefaultContainer'>
      <BatteryLow/>
    </div>
  )
}
