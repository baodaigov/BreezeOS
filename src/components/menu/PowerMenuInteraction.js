import React from "react";
import './PowerMenu.scss';

function shutDown(){
    document.getElementsByClassName('Menu')[0].classList.remove('active');
    document.getElementsByClassName('PowerMenu')[0].classList.remove('active');

    setTimeout(() => {
        document.getElementsByClassName('Desktop')[0].classList.add('disableItem');
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
                <div className="PowerMenuInteraction" onClick={shutDown}>
                    <i className="fa-solid fa-power-off"></i>
                    <p className="PowerMenuInteractionTitle">Shutdown</p>
                </div>
            )
        case 'restart':
            return (
                <div className="PowerMenuInteraction">
                    <i className="fa-solid fa-rotate-left"></i>
                    <p className="PowerMenuInteractionTitle">Restart</p>
                </div>
            )
    }
}