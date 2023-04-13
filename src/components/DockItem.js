import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Dock.scss';

export default function DockItem({ id, title, icon, onClick }) {
    const [isActive, setActive] = useState('false');

    const toggle = () => {
  		setActive(!isActive);
  	};

      return (
          <div className='DockItemContainer'>
            <div
              className={`DockItem ${isActive ? "" : "clicked"}`}
              key={id}
              onClick={onClick}
            >
              <p className='DockItemTitle'>{title}</p>
              <img
                src={icon}
                width={"35px"}
                height={"35px"}
                onClick={toggle}
              />
            </div>
          </div>
      )
}
