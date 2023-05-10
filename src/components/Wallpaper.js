import React from 'react';
import ReactDOM from 'react-dom';
import './Wallpaper.scss'

export default function Wallpaper(){
    setTimeout(() => {
        document.getElementsByClassName('Wallpaper')[0].classList.remove('activeAnimation');
        document.getElementsByClassName('Wallpaper')[0].classList.add('active');
    }, 300);
    return (
        <div className='Wallpaper activeAnimation'></div>
    )
}