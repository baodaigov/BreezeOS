import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderHide } from "../reducers/header";
import { setDockHide } from "../reducers/dock";
import { setAllowSwitchWorkspace } from "../reducers/wallpaper";
import Hammer from "react-hammerjs";
import { setDesktopBodyActive } from "../reducers/desktopbody";
import { setStartMenuActive } from "../reducers/startmenu";

export default function Home() {
  const shellTheme = useSelector((state) => state.shell.theme);
  const dispatch = useDispatch();

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
