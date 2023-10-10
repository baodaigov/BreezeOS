import { setHeaderHide } from "../store/reducers/header";
import { setDockHide } from "../store/reducers/dock";
import { setAllowSwitchWorkspace } from "../store/reducers/wallpaper";
import Hammer from "react-hammerjs";
import { setDesktopBodyActive } from "../store/reducers/desktopbody";
import { setStartMenuActive } from "../store/reducers/startmenu";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Home() {
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const dispatch = useAppDispatch();

  function startMenu() {
    dispatch(setDesktopBodyActive(false));
    dispatch(setHeaderHide(true));
    dispatch(setStartMenuActive(true));
  }

  function switchWorkspace() {
    dispatch(setDesktopBodyActive(false));
    dispatch(setAllowSwitchWorkspace(true));
    dispatch(setHeaderHide(true));
    dispatch(setDockHide(true));
  }

  return (
    <Hammer onTap={startMenu} onPress={switchWorkspace}>
      <div className="Home Header-item">
        {shellTheme === "WhiteSur" ? (
          <i className="fa-brands fa-apple Apple" />
        ) : (
          <i className="fa-regular fa-circle" />
        )}
      </div>
    </Hammer>
  );
}
