import React from 'react';
import './StartMenu.scss';

export default function StartApp(props){
    return (
        <div className='StartApp' onClick={props.onClick}>
            <img src={props.icon} className='StartIcon' width='70px' height='70px'/>
            <p className='StartAppTitle'>{props.name}</p>
        </div>
    )
}