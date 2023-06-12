import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Dock.scss';

export default function DockItem(props) {
      return (
          <div className='DockItemContainer'>
            <div
              className={`DockItem ${props.class}`}
              id={props.id}
              key={props.id}
            >
              <p className='DockItemTitle'>{props.title}</p>
              <img
                src={props.icon}
                width={37}
                height={37}
                onClick={props.onClick}
              />
            </div>
          </div>
      )
}
