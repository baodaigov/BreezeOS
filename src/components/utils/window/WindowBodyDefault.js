import React, { Component } from 'react';
import WindowBodyButton from './WindowBodyButton';
import './Window.scss';

export default function WindowBodyDefault({ type, title, content }) {
  switch(type){
    case "critical":
      return (
        <div className='WindowBodyDefault'>
          <div style={{ display: "flex" }}>
            <i class="fa-regular fa-xmark critical"></i>
            <div className='WindowBodyRight' style={{ marginLeft: "10px" }}>
              <p className='WindowBodyTitle'>{title}</p>
              <p className='WindowBodyContent'>{content}</p>
            </div>
          </div>
          <WindowBodyButton code='0'/>
        </div>
      )
  }
}
