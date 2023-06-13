import React from 'react';
import {useSelector} from "react-redux";

export default function Home(){
  const shellTheme = useSelector(state => state.shell.theme);

  function startMenu(){
      document.getElementsByClassName('DesktopBody')[0].classList.remove('active');
      document.getElementsByClassName('Header')[0].classList.remove('active');
      document.getElementsByClassName('StartMenuWrapper')[0].classList.add('active');
  }

  return (
    <div className='Home Header-item' onClick={startMenu}>
        {shellTheme === 'WhiteSur' ? <i className="fa-brands fa-apple Apple"></i> : <i className="fa-regular fa-circle"></i>}
    </div>
  )
}