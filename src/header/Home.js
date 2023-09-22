import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHeaderActive } from "../reducers/header";

export default function Home() {
  const shellTheme = useSelector((state) => state.shell.theme);
  const dispatch = useDispatch();

  function startMenu() {
    document
      .getElementsByClassName("DesktopBody")[0]
      .classList.remove("active");
    dispatch(setHeaderActive(false));
    document
      .getElementsByClassName("StartMenuWrapper")[0]
      .classList.add("active");
  }

  return (
    <div className="Home Header-item" onClick={startMenu}>
      {shellTheme === "WhiteSur" ? (
        <i className="fa-brands fa-apple Apple"></i>
      ) : (
        <i className="fa-regular fa-circle"></i>
      )}
    </div>
  );
}
