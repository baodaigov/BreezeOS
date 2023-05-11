import React from 'react';
import './Window.scss';
import Terminal from '../../../containers/apps/terminal'
import Firefox from '../../../containers/apps/firefox';
import Clock from '../../../containers/apps/clock';
import Camera from '../../../containers/apps/camera';
import Files from '../../../containers/apps/files';
import Calculator from '../../../containers/apps/calculator';
import TextEditor from '../../../containers/apps/texteditor';
import SoftwareStore from '../../../containers/apps/softwarestore';

export default function Window(){
  return (
    <div className='WindowContainer'>
      <Firefox/>
      <Clock/>
      <Camera/>
      <Files/>
      <Calculator/>
      <TextEditor/>
      <Terminal/>
      <SoftwareStore/>
    </div>
  )
}
