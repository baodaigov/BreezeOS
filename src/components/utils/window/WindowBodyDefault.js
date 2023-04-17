import React, { Component } from 'react';
import './Window.scss';

export default function WindowBodyDefault({ type, title, content, children }) {
  switch(type){
    case "critical":
      return (
        <div className='WindowBodyDefault'>
          <div style={{ display: "flex" }}>
            <div className='WindowBodyIcon critical'>
              <i class="fa-regular fa-xmark"></i>
            </div>
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
