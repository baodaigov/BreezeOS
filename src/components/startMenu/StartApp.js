import React from "react";
import "./StartMenu.scss";

export default function StartApp({
  name,
  icon,
  onClick
}) {
  return (
    <div className="StartApp" onClick={onClick}>
      <img src={icon} className="StartIcon" width="75px" height="75px" />
      <p className="StartAppTitle">{name}</p>
    </div>
  );
}
