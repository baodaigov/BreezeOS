import { useEffect } from "react";
import "./LockScreen.scss";
import SplashScreen from "./SplashScreen";
import { setHeaderActive } from "../../store/reducers/header";
import { setDockActive } from "../../store/reducers/dock";
import { setDesktopBodyActive } from "../../store/reducers/desktopbody";
import {
  setLockScreenActive,
  setLockScreenWrapperActive,
} from "../../store/reducers/lock";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function LockScreen() {
  const dispatch = useAppDispatch();
  const isActive = useAppSelector((state) => state.lock.active);
  const wrapperIsActive = useAppSelector((state) => state.lock.wrapperActive);
  const wallpaperImg = useAppSelector((state) => state.wallpaper.img);
  const isLocked = useAppSelector((state) => state.settings.isLocked);

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
