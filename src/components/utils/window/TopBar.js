import {useSelector} from "react-redux";
import './Window.scss';

export default function TopBar(props){
    const shellTheme = useSelector(state => state.shell.theme);

    return (
        <div className={`TopBar ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`} onDoubleClick={props.onDblClick}>
            <p className='TopBarTitle'>{props.title}</p>
            <div className='TopBarInteractionContainer'>
                {props.children}
            </div>
        </div>
    )
}