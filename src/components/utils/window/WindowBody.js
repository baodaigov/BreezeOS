import {useSelector} from "react-redux";
import './Window.scss';

export default function WindowBody(props) {
    const shellTheme = useSelector(state => state.shell.theme);
    return (
        <div className={`WindowBody ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`}>{props.children}</div>
    )
}
