import { useEffect, useState, useRef } from "react";
import Wallpaper from "./components/Wallpaper";
import "./Desktop.scss";
import Window from "./components/utils/window/Window";
import WindowDefault from "./components/utils/window/WindowDefault";
import Widget from "./components/Widget";
import { useSelector } from "react-redux";

const DesktopBody = () => {
  const isActive = useSelector((state) => state.desktopbody.active);

  return (
    <div className={`DesktopBody ${isActive && "active"}`}>
      <Widget />
      <Window />
      <WindowDefault />
    </div>
  );
};

export default DesktopBody;
