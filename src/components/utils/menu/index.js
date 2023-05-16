import './index.scss';

export const ActMenuSelector = (props) => {
    return (
        <div className='ActMenuSelector' onClick={props.onClick}>
            {props.active ? <i className="fa-regular fa-check"></i> : ''}
            <p>{props.title}</p>
            {props.children}
        </div>
    )
}

export default function ActMenu(props){
    return (
        <div className={`ActMenu ${props.className}`} style={props.style} ref={props.ref}>{props.children}</div>
    )
}
