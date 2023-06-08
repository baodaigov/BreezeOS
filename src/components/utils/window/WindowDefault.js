import React from 'react';
import './Window.scss';
import UnsuitableBrowser from '../../../containers/msgbox/UnsuitableBrowser'
import MissingPermissionCamera from '../../../containers/msgbox/MissingPermissionCamera';

export default function WindowDefault(){
  return (
    <div className='WindowDefaultContainer'>
      <UnsuitableBrowser/>
      <MissingPermissionCamera/>
    </div>
  )
}
