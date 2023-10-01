import { useSelector } from "react-redux";
import "./Wallpaper.scss";
import { useEffect } from "react";

export default function Wallpaper() {
  const wallpaperImg = useSelector((state) => state.wallpaper.img);
  const allowSwitchWorkspace = useSelector(
    (state) => state.wallpaper.allowSwitchWorkspace
  );

  useEffect(
    () =>
      document
        .getElementsByClassName("WallpaperWrapper")[0]
        .classList.add("active"),
    []
  );

  return (
    <div
      className="WallpaperWrapper"
      style={{ backgroundImage: `url(${wallpaperImg})` }}
    >
      <div className="WallpaperWrapperBackground">
        <p className="Title">Switch workspaces</p>
        <div
          className={`Wallpaper ${allowSwitchWorkspace && "minimize"}`}
          style={{ backgroundImage: `url(${wallpaperImg})` }}
        ></div>
      </div>
    </div>
  );
}
