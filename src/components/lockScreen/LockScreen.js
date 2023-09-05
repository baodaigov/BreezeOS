import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LockScreen.scss";
import SplashScreen from "./SplashScreen";
import { setHeaderActive } from "../../reducers/header";
import { setDockActive } from "../../reducers/dock";

export default function LockScreen() {
  const dispatch = useDispatch();
  const wallpaperImg = useSelector((state) => state.wallpaper.img);
  const isLocked = useSelector((state) => state.settings.isLocked);

  useEffect(() => {
    if (isLocked) {
      setTimeout(() => {
        dispatch(setHeaderActive(false));
        dispatch(setDockActive(false));
      }, 200);

      setTimeout(() => {
        document
          .getElementsByClassName("LockScreen")[0]
          .classList.add("active");
      }, 400);

      setTimeout(() => {
        document
          .getElementsByClassName("LockScreenWrapper")[0]
          .classList.add("active");
      }, 500);
    } else {
        document.getElementsByClassName("LockScreen")[0].classList.remove("active");
        document
          .getElementsByClassName("LockScreenWrapper")[0]
          .classList.remove("active");
        dispatch(setHeaderActive(true));
        dispatch(setDockActive(true));
    }
  }, [isLocked]);

  return (
    <div className='LockScreen' style={{ backgroundImage: `url(${wallpaperImg})` }}>
      <div className="LockScreenWrapper">
        <SplashScreen />
      </div>
    </div>
  );
}
