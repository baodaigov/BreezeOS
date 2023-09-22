import { useEffect, useState, useRef } from "react";
import Wallpaper from "./components/Wallpaper";
import "./Desktop.scss";
import Window from "./components/utils/window/Window";
import WindowDefault from "./components/utils/window/WindowDefault";
import Widget from "./components/Widget";

const DesktopBody = () => {
  return (
    <div className="DesktopBody">
      <Widget />
      <Window />
      <WindowDefault />
    </div>
  );
};

export default DesktopBody;
