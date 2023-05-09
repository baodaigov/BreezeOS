import React from 'react';
import './Window.scss';
import BatteryLow from '../../../containers/msgbox/BatteryLow'
import UnsuitableBrowser from '../../../containers/msgbox/UnsuitableBrowser'
import MissingPermissionCamera from '../../../containers/msgbox/MissingPermissionCamera';
export default function WindowDefault(){
  return (
    <div className='WindowDefaultContainer'>
      <BatteryLow/>
      <UnsuitableBrowser/>
      <MissingPermissionCamera/>
    </div>
  )
}
