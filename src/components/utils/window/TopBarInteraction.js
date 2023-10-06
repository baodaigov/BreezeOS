import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Window.scss";
import "../../../Desktop.scss";

export default function TopBarInteraction({
  action,
  onClose,
  onHide,
  onMinMax,
}) {
  function switchAction() {
    switch (action) {
      case "close":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onClose}
          >
            <i className="fa-solid fa-xmark fa-lg" />
          </div>
        );

      case "hide":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onHide}
          >
            <i className="fa-solid fa-chevron-down" />
          </div>
        );

      case "min":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onMinMax}
          >
            <i className="fa-regular fa-window-restore fa-sm" />
          </div>
        );

      case "max":
        return (
          <div
            className={`TopBarInteraction ${action}`}
            key={action}
            onClick={onMinMax}
          >
            <i className="fa-regular fa-window-maximize fa-sm" />
          </div>
        );
    }
  }

  return switchAction();
}
