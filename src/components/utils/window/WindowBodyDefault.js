import React, { Component } from 'react';
import './Window.scss';

export default function WindowBodyDefault({ type, title, content, children }) {
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
          {children}
        </div>
      )
  }
}
