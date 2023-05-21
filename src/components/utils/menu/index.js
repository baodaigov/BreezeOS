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
    return (
        <div className={`ActMenu ${props.className}`} style={props.style} ref={ref}>{props.children}</div>
    )
}

export default forwardRef(ActMenu);