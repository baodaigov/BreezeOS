import React from 'react';
import './Window.scss';
import BatteryLow from '../../../containers/msgbox/BatteryLow'
import BatteryNotFound from '../../../containers/msgbox/BatteryNotFound'

export default function WindowDefault(){
  return (
    <div className='WindowDefaultContainer'>
      <BatteryLow/>
      <BatteryNotFound/>
    </div>
  )
}
