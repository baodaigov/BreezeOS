import React, { useEffect } from "react";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBodyDefault from "../../components/utils/window/WindowBodyDefault";
import WindowBodyButton from "../../components/utils/window/WindowBodyButton";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import "./assets/index.scss";
import Draggable from "react-draggable";

export default function MissingPermissionCamera() {
  return (
    <Draggable handle=".TopBar">
      <div
        className="Window MissingPermissionCamera active"
        style={{ width: "450px" }}
        key={Math.random()}
      >
        <TopBar>
          <TopBarInteraction
            action="close"
            onClose={() =>
              document
                .getElementsByClassName("MissingPermissionCamera")[0]
                .classList.remove("active")
            }
          />
        </TopBar>
        <WindowBodyDefault
          type="exclamation"
          title="Missing permission"
          content="Please grant permission in order to take photos and videos."
        >
          <WindowBodyButton>
            <button className="Button" key={Math.random()}>
              Open Settings...
            </button>
            <button
              className="Button"
              key={Math.random()}
              onClick={() =>
                document
                  .getElementsByClassName("MissingPermissionCamera")[0]
                  .classList.remove("active")
              }
            >
              OK
            </button>
          </WindowBodyButton>
        </WindowBodyDefault>
      </div>
    </Draggable>
  );
}
