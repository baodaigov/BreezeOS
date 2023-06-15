import {useSelector} from "react-redux";
import './Range.scss';

export default function RangeSlider(props){
    const shellTheme = useSelector(state => state.shell.theme);

    return <input type='range' className={`Range ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`} min={props.min} max={props.max} onMouseUp={props.onClick}/>
}