import { useSelector } from "react-redux";
import "./Wallpaper.scss";

export default function Wallpaper() {
  const wallpaperImg = useSelector((state) => state.wallpaper.img);

  setTimeout(() => {
    document
      .getElementsByClassName("Wallpaper")[0]
      .classList.remove("activeAnimation");
    document.getElementsByClassName("Wallpaper")[0].classList.add("active");
  }, 300);

  return <div className='Wallpaper activeAnimation' style={{ backgroundImage: `url(${wallpaperImg})` }}></div>;
}
