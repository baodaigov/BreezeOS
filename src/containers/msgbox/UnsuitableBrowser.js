import { useEffect, useState } from "react";
import { useBattery } from "react-use";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBodyDefault from "../../components/utils/window/WindowBodyDefault";
import WindowBodyButton from "../../components/utils/window/WindowBodyButton";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import "./assets/index.scss";
import Draggable from "react-draggable";

export default function UnsuitableBrowser() {
  const [isActive, setIsActive] = useState(false);

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  useEffect(() => {
    if (isNaN(batteryPercent)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [batteryPercent]);

  return (
    <Draggable handle=".TopBar">
      <div
        className={`Window UnsuitableBrowser ${isActive && "active"}`}
        style={{ width: "550px" }}
        key={Math.random()}
      >
        <TopBar>
          <TopBarInteraction
            action="close"
            onClose={() => setIsActive(false)}
          />
        </TopBar>
        <WindowBodyDefault
          type="exclamation"
          title="Unsuitable web browser"
          content="For full experiences, we recommend you to switch to a different browser platform."
        >
          <WindowBodyButton>
            <button
              className="Button"
              key={Math.random()}
              onClick={() => setIsActive(false)}
            >
              OK
            </button>
          </WindowBodyButton>
        </WindowBodyDefault>
      </div>
    </Draggable>
  );
}
