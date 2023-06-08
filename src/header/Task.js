import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {activePanel, inactivePanel} from '../reducers/panel'
import Panel from '../components/panel/Panel'
import '../Desktop.scss';
import '../components/Header.scss';

const Task = props => {
    const panelActive = useSelector(state => state.panel.active);
    const dispatch = useDispatch();
    
    function useOutsidePanel(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            dispatch(inactivePanel());
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

    const panelRef = useRef(null);
    useOutsidePanel(panelRef);

    return (
        <div className={`Task Header-item ${panelActive ? 'active' : ''}`} onMouseDown={() => dispatch(activePanel())} ref={panelRef}>
            {props.children}
            <Panel style={{ top: "45px", right: "0", height: "340px" }}/>
        </div>
    )
}

export default Task;
