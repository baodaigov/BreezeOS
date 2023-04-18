import React from 'react';

function startMenu(){
  document.getElementsByClassName('DesktopBody')[0].classList.remove('active');
  document.getElementsByClassName('Header')[0].classList.remove('active');
  document.getElementsByClassName('StartMenuWrapper')[0].classList.add('active');
}

function Home(){
  return (
    <div className='Home Header-item' onClick={startMenu}>
      <i className="fa-regular fa-circle"></i>
    </div>
  )
}

export default Home;
