import React from 'react';
import './Window.scss';
import BatteryLow from '../../../containers/msgbox/BatteryLow'
import UnsuitableBrowser from '../../../containers/msgbox/UnsuitableBrowser'

export default function WindowDefault(){
  return (
    <div className='WindowDefaultContainer'>
      <BatteryLow/>
      <UnsuitableBrowser/>
    </div>
  )
}
