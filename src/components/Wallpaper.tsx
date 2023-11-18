import "./Wallpaper.scss";
import { setAllowSwitchWorkspace } from "../store/reducers/wallpaper";
import { setDockHide } from "../store/reducers/dock";
import { setHeaderHide } from "../store/reducers/header";
import { setDesktopBodyHide } from "../store/reducers/desktopbody";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Wallpaper() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.wallpaper.active);
  const wallpaperImg = useAppSelector((state) => state.wallpaper.img);
  const allowSwitchWorkspace = useAppSelector(
    (state) => state.wallpaper.allowSwitchWorkspace
  );

  function selectWorkspace() {
    dispatch(setDesktopBodyHide(false));
    dispatch(setAllowSwitchWorkspace(false));
    dispatch(setHeaderHide(false));
    dispatch(setDockHide(false));
  }

  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) selectWorkspace();
  });

  return (
    <div
      className={`WallpaperWrapper ${isActive && "active"}`}
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
