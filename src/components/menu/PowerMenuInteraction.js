import React, {useState} from "react";
import './PowerMenu.scss';
import TerminalWindow from "../utils/window/TerminalDesktop";

export default function PowerMenuInteraction(props){

    function ShutDown(){
    
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
    
        setTimeout(() => {
            document.getElementsByClassName('DesktopBody')[0].classList.remove('active');
        }, 500);
    
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.remove('active');
            document.getElementsByClassName('Dock')[0].classList.remove('active');
        }, 1000);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('active');
        }, 2500);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
        }, 3500);
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.add('poweroff');
            document.getElementsByClassName('Wallpaper')[0].classList.remove('active');
        }, 9500);
    }

    function Lock(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
    
        setTimeout(() => {
            document.getElementsByClassName('LockScreen')[0].classList.add('active');
        }, 200);
    
        setTimeout(() => {
            document.getElementsByClassName('LockScreenWrapper')[0].classList.add('active');
        }, 250);
    }
    
    document.addEventListener('keydown', e => {
        if(e.altKey && e.keyCode === 76){
            Lock()
        }
    })
    
    function Restart(){
        ShutDown();
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('poweroff');
            document.getElementsByClassName('Desktop')[0].classList.add('blackscr');
        }, 13500)
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.add('cursorLoad');
        }, 15000)
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('blackscr');
            document.getElementsByClassName('Desktop')[0].classList.remove('cursorLoad');
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
        },17000)
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.remove('active');
            document.getElementsByClassName('TerminalWindow')[0].classList.remove('cursorLoad');
            document.getElementsByClassName('Wallpaper')[0].classList.add('activeAnimation');
        }, 23500);

        setTimeout(() => {
            document.getElementsByClassName('Wallpaper')[0].classList.remove('activeAnimation');
            document.getElementsByClassName('Wallpaper')[0].classList.add('active');
        }, 23800);
    
        setTimeout(() => {
            document.getElementsByClassName('Header')[0].classList.add('active');
            document.getElementsByClassName('Dock')[0].classList.add('active');
        }, 24500);
    
        setTimeout(() => {
            document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        }, 26500);
    }
    
    function Sleep(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.add('sleep');
        }, 500);
    }
    
    document.addEventListener('mousemove', e => {
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('sleep');
        }, 100);
    })

    var type = props.type;
    switch(type){
        case 'sleep':
            return (
                <div className="PowerMenuInteraction" onClick={Sleep}>
                    <i className="fa-solid fa-moon"></i>
                    <p className="PowerMenuInteractionTitle">Sleep</p>
                </div>
            )
        case 'lock':
            return (
                <div className="PowerMenuInteraction" onClick={Lock}>
                    <i className="fa-solid fa-lock"></i>
                    <p className="PowerMenuInteractionTitle">Lock</p>
                </div>
            )
        case 'shutdown':
            return (
                <div className="PowerMenuInteraction" onClick={ShutDown}>
                    <i className="fa-solid fa-power-off"></i>
                    <p className="PowerMenuInteractionTitle">Shutdown</p>
                </div>
            )
        case 'restart':
            return (
                <div className="PowerMenuInteraction" onClick={Restart}>
                    <i className="fa-solid fa-rotate-left"></i>
                    <p className="PowerMenuInteractionTitle">Restart</p>
                </div>
            )
    }
}