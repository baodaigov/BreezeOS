import {useSelector} from "react-redux";
import './Window.scss';

export default function WindowBodyDefault(props) {
  const shellTheme = useSelector(state => state.shell.theme);

  switch(props.type){
    case "critical":
      return (
        <div className={`WindowBodyDefault ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}}`}>
          <div style={{ display: "flex" }}>
            <div className='WindowBodyIcon critical'>
              <i class="fa-regular fa-xmark"></i>
            </div>
            <div className='WindowBodyRight' style={{ marginLeft: "10px" }}>
              <p className='WindowBodyTitle'>{props.title}</p>
              <p className='WindowBodyContent'>{props.content}</p>
            </div>
          </div>
          {props.children}
        </div>
      )
    case "exclamation":
      return (
        <div className={`WindowBodyDefault ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`}>
          <div style={{ display: "flex" }}>
            <div className='WindowBodyIcon exclamation'>
              <i class="fa-solid fa-exclamation"></i>
            </div>
            <div className='WindowBodyRight' style={{ marginLeft: "10px" }}>
              <p className='WindowBodyTitle'>{props.title}</p>
              <p className='WindowBodyContent'>{props.content}</p>
            </div>
          </div>
          {props.children}
        </div>
      )
    default:
      return (
        <div className={`WindowBodyDefault ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`}>
          <div style={{ display: "flex" }}>
            <div className='WindowBodyIcon'>
              <i className={`fa-regular ${props.icon}`}></i>
            </div>
            <div className='WindowBodyRight' style={{ marginLeft: "10px" }}>
              <p className='WindowBodyTitle'>{props.title}</p>
              <p className='WindowBodyContent'>{props.content}</p>
            </div>
          </div>
          {props.children}
        </div>
      )
  }
}
