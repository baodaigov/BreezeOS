import React from 'react';
import './StartMenu.scss';

export default function StartApp(props){
    return (
        <div className='StartApp' onClick={props.onClick}>
            <img src={props.icon} className='StartIcon' width='75px' height='75px'/>
            <p className='StartAppTitle'>{props.name}</p>
        </div>
    )
}