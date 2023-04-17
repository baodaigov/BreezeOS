import React, {useState} from 'react';
import './TerminalDesktop.scss';

export const TerminalLine = [];

export default function TerminalWindow(props){
    return (
        <div className='TerminalWindow'>
            {TerminalLine.map(index => <pre>{index}</pre>)}
        </div>
    )
}