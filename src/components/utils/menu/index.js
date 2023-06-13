import {useSelector} from "react-redux";
import { forwardRef } from 'react';
import './index.scss';

export const ActMenuSelector = (props) => {
    return (
        <div className='ActMenuSelector' style={props.style} onClick={props.onClick}>
            <p>{props.title}</p>
            <i className={`fa-regular fa-check ${props.active ? 'active' : ''}`}></i>
            {props.children}
        </div>
    )
}

function ActMenu(props, ref){
    const shellTheme = useSelector(state => state.shell.theme);
    return (
        <div className={`ActMenu ${props.className} ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`} style={props.style} ref={ref}>{props.children}</div>
    )
}

export default forwardRef(ActMenu);