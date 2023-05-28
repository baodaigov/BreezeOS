import React, {useState, useEffect} from 'react';
import './TerminalDesktop.scss';
import { useSelector } from 'react-redux';

export default function TerminalWindow(props){
    const array = useSelector(state => state.shutdown.elem);

    useEffect(() => {
        const TerminalWindow = document.getElementById('TerminalWindow');
        TerminalWindow.scrollIntoView(true);
    }, [])

    return (
        <div className='TerminalWindow' id='TerminalWindow'>
            {array}
        </div>
    )
}