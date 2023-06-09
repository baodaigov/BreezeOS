import React, { useState } from 'react';
import './StartMenu.scss';

export default function SearchMenu(props){
    return (
        <div className='SearchMenu'>
            <div className='SearchInput' contentEditable onKeyUp={props.onSearch} onChange={props.onChange} spellCheck='false'>{props.value}</div>
        </div>
    )

}