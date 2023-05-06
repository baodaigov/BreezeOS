import './index.scss';

export const ActMenuSelector = (props) => {
    return (
        <div className='ActMenuSelector'>
            {props.active ? <i className="fa-regular fa-check"></i> : ''}
            <p>{props.title}</p>
        </div>
    )
}

export default function ActMenu(props){
    return (
        <div className='ActMenu' style={props.style}>{props.children}</div>
    )
}