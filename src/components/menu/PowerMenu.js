import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import PowerMenuInteraction from './PowerMenuInteraction';
import './PowerMenu.scss';

function useOutside(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        document.getElementsByClassName('Menu')[0].classList.remove('active');
        document.getElementsByClassName('PowerMenu')[0].classList.remove('active');
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

export default function PowerMenu(){
    const shellTheme = useSelector(state => state.shell.theme);
    const powerRef = useRef(null);
    useOutside(powerRef);
    return (
        <div className={`PowerMenu ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`} ref={powerRef}>
            <PowerMenuInteraction type='sleep' key={Math.random()}/>
            <PowerMenuInteraction type='lock' key={Math.random()}/>
            <PowerMenuInteraction type='shutdown' key={Math.random()}/>
            <PowerMenuInteraction type='restart' key={Math.random()}/>
        </div>
    )
}