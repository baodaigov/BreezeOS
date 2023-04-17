import React from 'react';
import './LockScreen.scss';

function login(){
    document.getElementsByClassName('LockScreen')[0].classList.remove('active');
    document.getElementsByClassName('LockScreenWrapper')[0].classList.remove('active');
}

document.addEventListener("keydown", e => {
    if(e.keyCode === 13){
        login();
    }
})

export default function LoginButton(){
    return (
        <div className='LoginButton' onClick={login}>
            <i class="fa-regular fa-arrow-right SplashScreenIcon"></i>
        </div>
    )
}