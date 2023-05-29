import { useSelector } from 'react-redux';
import './Wallpaper.scss'

export default function Wallpaper(){
    const wallpaperId = useSelector(state => state.wallpaper.id);

    setTimeout(() => {
        document.getElementsByClassName('Wallpaper')[0].classList.remove('activeAnimation');
        document.getElementsByClassName('Wallpaper')[0].classList.add('active');
    }, 300);

    return (
        <div className={`Wallpaper ${wallpaperId} activeAnimation`}></div>
    )
}