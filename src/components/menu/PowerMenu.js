import React from 'react';
import PowerMenuInteraction from './PowerMenuInteraction';
import './PowerMenu.scss';

export default function PowerMenu(){
    return (
        <div className='PowerMenu active'>
            <PowerMenuInteraction type='sleep' key={Math.random()}/>
            <PowerMenuInteraction type='lock' key={Math.random()}/>
            <PowerMenuInteraction type='shutdown' key={Math.random()}/>
            <PowerMenuInteraction type='restart' key={Math.random()}/>
        </div>
    )
}