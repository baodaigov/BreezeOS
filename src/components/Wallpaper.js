import { useSelector } from "react-redux";
import "./Wallpaper.scss";
import { useEffect, useState } from "react";

export default function Wallpaper() {
  const wallpaperImg = useSelector((state) => state.wallpaper.img);

  useEffect(() => document.getElementsByClassName("Wallpaper")[0].classList.add("active"), []);

  return (
    <div
      className="Wallpaper"
      style={{ backgroundImage: `url(${wallpaperImg})` }}
    ></div>
  );
}
