import { useEffect, useState, useRef } from "react";
import './Clock.scss';
import Draggable from 'react-draggable';
import ActMenu, { ActMenuSelector } from "../menu";

const Clock = () => {
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [sec, setSec] = useState(null);
  const [contextMenuEnabled, setContextMenuEnabled] = useState(false);
  const [displaySeconds, setDisplaySeconds] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setHour(new Date().getHours() * 30);
      setMin(new Date().getMinutes() * 6);
      setSec(new Date().getSeconds() * 6);
    }, 1000);
  }, [hour, min, sec]);

  function useOutsideMenu(ref) {
    useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setContextMenuEnabled(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideMenu(contextMenuRef);

  function onContextMenu(e){
    e.preventDefault();
    setContextMenuEnabled(true);
  }

  function displayseconds(){
    setContextMenuEnabled(false);
    setDisplaySeconds(!displaySeconds)
  }

  function close(){
    document.getElementsByClassName('ClockWidget')[0].classList.remove('active');
  }
  
  return (
    <Draggable>
      <div className="ClockWidget active" onContextMenu={onContextMenu}>
        <ActMenu style={{ position: 'relative', zIndex: '10001', top: '100px', right: '100px' }} className={contextMenuEnabled ? 'active' : ''} ref={contextMenuRef}>
          <ActMenuSelector title='Change style'></ActMenuSelector>
          {displaySeconds ? <ActMenuSelector title='Display seconds' active onClick={displayseconds}></ActMenuSelector> : <ActMenuSelector title='Display seconds' onClick={displayseconds}></ActMenuSelector>} 
        </ActMenu>
        <div className="Close" onClick={close}>
          <i class="fa-solid fa-xmark"></i>
        </div>
        <div
          className="Hour"
          style={{
            transform: `rotateZ(${hour}deg)`
          }}
        />
        <div
          className="Min"
          style={{
            transform: `rotateZ(${min}deg)`
          }}
        />
        <div
          className={`Sec ${displaySeconds ? 'active' : ''}`}
          style={{
            transform: `rotateZ(${sec}deg)`
          }}
        />
        <span className="Number twelve">12</span>
        <span className="Number three">3</span>
        <span className="Number six">6</span>
        <span className="Number nine">9</span>
      </div>
    </Draggable>
  );
}

export default Clock