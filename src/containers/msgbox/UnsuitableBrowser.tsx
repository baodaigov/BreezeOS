import { useEffect, useState } from "react";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBodyDefault from "../../components/utils/window/WindowBodyDefault";
import WindowBodyButton from "../../components/utils/window/WindowBodyButton";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import Draggable from "react-draggable";
import { useAppSelector } from "@/store/hooks";

export default function UnsuitableBrowser() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const batteryPercent = useAppSelector((state) => state.system.battery.level);

  useEffect(() => {
    if (!batteryPercent) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [batteryPercent]);

  return (
    <Draggable handle=".TopBar">
      <div
        className={`Window ${isActive && "active"}`}
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
