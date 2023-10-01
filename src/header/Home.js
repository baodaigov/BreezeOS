import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderHide } from "../reducers/header";
import { setDockHide } from "../reducers/dock";
import { setAllowSwitchWorkspace } from "../reducers/wallpaper";
import Hammer from "react-hammerjs";

export default function Home() {
  const shellTheme = useSelector((state) => state.shell.theme);
  const dispatch = useDispatch();

  function startMenu() {
    document
      .getElementsByClassName("DesktopBody")[0]
      .classList.remove("active");
    dispatch(setHeaderHide(true));
    document
      .getElementsByClassName("StartMenuWrapper")[0]
      .classList.add("active");
  }

  function switchWorkspace() {
    document
      .getElementsByClassName("DesktopBody")[0]
      .classList.remove("active");
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
