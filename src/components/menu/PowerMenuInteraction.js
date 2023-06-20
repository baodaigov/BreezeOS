import React, {useState} from "react";
import './PowerMenu.scss';
import TerminalWindow from "../utils/window/TerminalDesktop";
import { useSelector, useDispatch } from "react-redux";
import { pushItem, clearItem } from '../../reducers/shutdown';
import {setHeaderActive} from "../../reducers/header";
import {setDockActive} from "../../reducers/dock";

export default function PowerMenuInteraction(props){
    const array = useSelector(state => state.shutdown.elem);
    const dispatch = useDispatch();

    function ShutDown(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
    
        setTimeout(() => {
            document.getElementsByClassName('DesktopBody')[0].classList.remove('active');
        }, 500);
    
        setTimeout(() => {
            dispatch(setHeaderActive(false));
            dispatch(setDockActive(false));
        }, 1000);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('active');
        }, 2500);

        setTimeout(() => dispatch(pushItem(<pre>Stopped Load/Save Random Seed... OK</pre>)), 3000);
    
        setTimeout(() => {
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
            dispatch(pushItem(<pre>Stopped Session 1 of localhost... OK</pre>));
            dispatch(pushItem(<pre>Removed slice system-getty.slice... OK</pre>));
            dispatch(pushItem(<pre>Stopped Login Service... OK</pre>));
        }, 3500);

        setTimeout(() => {
            dispatch(pushItem(<pre>Stopped Initializes Pacman keyring... OK</pre>));
            dispatch(pushItem(<pre>Stopping Breeze Desktop Environment...</pre>));
        }, 3600);

        setTimeout(() => {
            dispatch(pushItem(<pre>Starting Plymouth Service...</pre>));
        }, 4000);

        setTimeout(() => {
            dispatch(clearItem());
            dispatch(pushItem((
                <div className='BootSplash'>
                    <p className='font-bold'>BreezeOS</p>
                </div>
            )));
        }, 4800);

        setTimeout(() => {
            dispatch(clearItem());
            document.getElementsByClassName('Desktop')[0].classList.add('poweroff');
            document.getElementsByClassName('Wallpaper')[0].classList.remove('active');
        }, 13200);
    }

    function Lock(){
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');

        setTimeout(() => {
            dispatch(setHeaderActive(false));
            dispatch(setDockActive(false));
        }, 200);
    
        setTimeout(() => {
            document.getElementsByClassName('LockScreen')[0].classList.add('active');
        }, 400);

        setTimeout(() => {
            document.getElementsByClassName('LockScreenWrapper')[0].classList.add('active');
        }, 500);
    }
    
    document.addEventListener('keydown', e => {
        if(e.ctrlKey && e.keyCode === 76){
            e.preventDefault();
            Lock();
        }
    })
    
    function Restart(){
        ShutDown();
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('poweroff');
            document.getElementsByClassName('Desktop')[0].classList.add('blackscr');
        }, 16500)
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.add('cursorLoad');
        }, 17500)
    
        setTimeout(() => {
            document.getElementsByClassName('Desktop')[0].classList.remove('blackscr');
            document.getElementsByClassName('Desktop')[0].classList.remove('cursorLoad');
            document.getElementsByClassName('TerminalWindow')[0].classList.add('cursorLoad');
            dispatch(clearItem());
            dispatch(pushItem(<pre>Reached target Startup... OK</pre>));
        },19000);

        setTimeout(() => {
            dispatch(pushItem(<pre>Started Startup... OK</pre>));
        }, 19700);

        setTimeout(() => {
            dispatch(pushItem(<pre>Starting Plymouth Service...</pre>))
        }, 20200);

        setTimeout(() => {
            dispatch(clearItem());
            dispatch(pushItem((
                <div className='BootSplash'>
                    <p className='font-bold'>BreezeOS</p>
                </div>
            )));
        }, 21500);
    
        setTimeout(() => {
            dispatch(clearItem());
            dispatch(pushItem(<pre>Initiating shutdown...</pre>));
            document.getElementsByClassName('TerminalWindow')[0].classList.remove('active');
            document.getElementsByClassName('TerminalWindow')[0].classList.remove('cursorLoad');
            document.getElementsByClassName('Wallpaper')[0].classList.add('activeAnimation');
        }, 36000);

        setTimeout(() => {
            document.getElementsByClassName('Wallpaper')[0].classList.remove('activeAnimation');
            document.getElementsByClassName('Wallpaper')[0].classList.add('active');
        }, 36300);
    
        setTimeout(() => {
            dispatch(setHeaderActive(true));
            dispatch(setDockActive(true));
        }, 37000);
    
        setTimeout(() => {
            document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        }, 38500);
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