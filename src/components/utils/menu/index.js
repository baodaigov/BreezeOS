import { useEffect, useRef } from 'react';
import './index.scss';

export const ActMenuSelector = (props) => {
    return (
        <div className='ActMenuSelector' style={props.style} onClick={props.onClick}>
            {props.active ? <i className="fa-regular fa-check"></i> : ''}
            <p>{props.title}</p>
            {props.children}
        </div>
    )
}

export default function ActMenu(props){

    function useOutsideAlerter(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            document.getElementsByClassName('ActMenu')[0].classList.remove('active');
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

    const actMenuRef = useRef(null);
    useOutsideAlerter(actMenuRef);

    return (
        <div className={`ActMenu ${props.className}`} style={props.style} ref={actMenuRef}>{props.children}</div>
    )
}
