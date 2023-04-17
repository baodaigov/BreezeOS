import React, {useState} from "react";
import './PowerMenu.scss';
import TerminalWindow from "../utils/window/TerminalDesktop";
import { TerminalLine } from "../utils/window/TerminalDesktop";

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
        TerminalLine.push('Initiating shutdown...')
    }, 2500);

    setTimeout(() => {
        document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
    }, 3500);

    setTimeout(() => {
        document.getElementsByClassName('Desktop')[0].classList.add('poweroff');
        TerminalLine.length = 0
    }, 9500);
}

function lock(){
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
    if(e.altKey && e.keyCode === 76) {
        lock();
    }
})

function Restart(){
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
        TerminalLine.push('Initiating shutdown...')
    }, 2500);

    setTimeout(() => {
        document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
    }, 3500);

    setTimeout(() => {
        document.getElementsByClassName('Desktop')[0].classList.add('poweroff');
        document.getElementsByClassName('TerminalWindow')[0].classList.remove('cursorLoad');
        TerminalLine.length = 0
    }, 9500);

    setTimeout(() => {
        document.getElementsByClassName('Desktop')[0].classList.remove('poweroff');
        document.getElementsByClassName('Desktop')[0].classList.add('poweron');
    }, 13500)

    setTimeout(() => {
        document.getElementsByClassName('Desktop')[0].classList.add('cursorLoad');
    }, 15000)

    setTimeout(() => {
        document.getElementsByClassName('Desktop')[0].classList.remove('poweron');
        document.getElementsByClassName('Desktop')[0].classList.remove('cursorLoad');
        document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
        TerminalLine.push('Initiating startup...')
    },17000)

    setTimeout(() => {
        document.getElementsByClassName('TerminalWindow')[0].classList.remove('active');
        document.getElementsByClassName('TerminalWindow')[0].classList.remove('cursorLoad');
    }, 20000);

    setTimeout(() => {
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('Dock')[0].classList.add('active');
    }, 21000);

    setTimeout(() => {
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
    }, 23000);
}

export default function PowerMenuInteraction(props){
    var type = props.type;
    switch(type){
        case 'sleep':
            return (
                <div className="PowerMenuInteraction">
                    <i className="fa-solid fa-moon"></i>
                    <p className="PowerMenuInteractionTitle">Sleep</p>
                </div>
            )
        case 'lock':
            return (
                <div className="PowerMenuInteraction" onClick={lock}>
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