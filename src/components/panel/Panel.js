import React, {useRef,useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';
import PanelTop from './PanelTop';
import PanelBottom from './PanelBottom';

function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementsByClassName('Panel')[0].classList.remove('active');
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

export default function Panel(props){
    const powerRef = useRef(null);
    useOutsideAlerter(powerRef);
    return (
        <div className='Panel' style={props.style} ref={powerRef}>
            <PanelTop/>
            <PanelBottom/>
        </div>
    )
}