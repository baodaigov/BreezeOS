import {useSelector, useDispatch} from 'react-redux';
import {setHeaderActive} from "../../reducers/header";
import './LockScreen.scss';
import {setDockActive} from "../../reducers/dock";

export default function LoginButton(){
    const dispatch = useDispatch();

    function login(){
        document.getElementsByClassName('LockScreen')[0].classList.remove('active');
        document.getElementsByClassName('LockScreenWrapper')[0].classList.remove('active');
        dispatch(setHeaderActive(true));
        dispatch(setDockActive(true));
    }

    document.addEventListener("keydown", e => {
        if(e.keyCode === 13){
            login();
        }
    });

    return (
        <div className='LoginButton' onClick={login}>
            <i className="fa-regular fa-arrow-right SplashScreenIcon"></i>
        </div>
    )
}