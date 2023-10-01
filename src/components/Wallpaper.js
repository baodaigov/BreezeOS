import { useDispatch, useSelector } from "react-redux";
import "./Wallpaper.scss";
import { useEffect } from "react";
import { setAllowSwitchWorkspace } from "../reducers/wallpaper";
import { setDockHide } from "../reducers/dock";
import { setHeaderHide } from "../reducers/header";

export default function Wallpaper() {
  const dispatch = useDispatch();
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

  function selectWorkspace() {
    document.getElementsByClassName("DesktopBody")[0].classList.add("active");
    dispatch(setAllowSwitchWorkspace(false));
    dispatch(setHeaderHide(false));
    dispatch(setDockHide(false));
  }

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) selectWorkspace();
  });

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
          onClick={selectWorkspace}
        >
          <p className="Label">Workspace 1</p>
        </div>
        <div
          className={`AddWorkspaceWrapper ${allowSwitchWorkspace && "active"}`}
        >
          <div className="AddWorkspace">
            <div className="AddWorkspaceButton">
              <i className="fa-regular fa-plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
