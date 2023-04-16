import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Dock.scss';

export default function DockItem(props) {
    const [isActive, setActive] = useState('false');

    const toggle = () => {
  		setActive(!isActive);
  	};

      return (
          <div className='DockItemContainer'>
            <div
              className={`DockItem ${isActive ? "" : "clicked"}`}
              id={props.id}
              key={props.id}
              onClick={props.onClick}
            >
              <p className='DockItemTitle'>{props.title}</p>
              <img
                src={props.icon}
                width={"35px"}
                height={"35px"}
                onClick={toggle}
              />
            </div>
          </div>
      )
}
