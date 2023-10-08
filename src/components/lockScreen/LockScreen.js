import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LockScreen.scss";
import SplashScreen from "./SplashScreen";
import { setHeaderActive } from "../../reducers/header";
import { setDockActive } from "../../reducers/dock";
import { setDesktopBodyActive } from "../../reducers/desktopbody";
import {
  setLockScreenActive,
  setLockScreenWrapperActive,
} from "../../reducers/lock";

export default function LockScreen() {
  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.lock.active);
  const wrapperIsActive = useSelector((state) => state.lock.wrapperActive);
  const wallpaperImg = useSelector((state) => state.wallpaper.img);
  const isLocked = useSelector((state) => state.settings.isLocked);

  useEffect(() => {
    if (isLocked) {
      setTimeout(() => {
        dispatch(setHeaderActive(false));
        dispatch(setDockActive(false));
        dispatch(setDesktopBodyActive(false));
      }, 200);
      setTimeout(() => dispatch(setLockScreenActive(true)), 400);
      setTimeout(() => dispatch(setLockScreenWrapperActive(true)), 500);
    } else {
      dispatch(setLockScreenActive(false));
      dispatch(setLockScreenWrapperActive(false));
      dispatch(setHeaderActive(true));
      dispatch(setDockActive(true));
      dispatch(setDesktopBodyActive(true));
    }
  }, [isLocked]);

  return (
    <div
      className={`LockScreen ${isActive && "active"}`}
      style={{ backgroundImage: `url(${wallpaperImg})` }}
    >
      <div className={`LockScreenWrapper ${wrapperIsActive && "active"}`}>
        <SplashScreen />
      </div>
    </div>
  );
}
