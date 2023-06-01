import React, { Component } from 'react';
import './Window.scss';

export default function WindowBodyDefault(props) {
  switch(props.type){
    case "critical":
      return (
        <div className='WindowBodyDefault'>
          <div style={{ display: "flex" }}>
            <div className='WindowBodyIcon critical'>
              <i class="fa-regular fa-xmark"></i>
            </div>
            <div className='WindowBodyRight' style={{ marginLeft: "10px" }}>
              <p className='WindowBodyTitle'>{props.title}</p>
              <p className='WindowBodyContent'>{props.content}</p>
            </div>
          </div>
          {props.children}
        </div>
      )
    case "exclamation":
      return (
        <div className='WindowBodyDefault'>
          <div style={{ display: "flex" }}>
            <div className='WindowBodyIcon exclamation'>
              <i class="fa-solid fa-exclamation"></i>
            </div>
            <div className='WindowBodyRight' style={{ marginLeft: "10px" }}>
              <p className='WindowBodyTitle'>{props.title}</p>
              <p className='WindowBodyContent'>{props.content}</p>
            </div>
          </div>
          {props.children}
        </div>
      )
  }
}
