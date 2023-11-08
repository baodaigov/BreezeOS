import { useState } from "react";
import "../../components/utils/window/Window.scss";
import TopBar from "../../components/utils/window/TopBar";
import WindowBodyDefault from "../../components/utils/window/WindowBodyDefault";
import WindowBodyButton from "../../components/utils/window/WindowBodyButton";
import TopBarInteraction from "../../components/utils/window/TopBarInteraction";
import Draggable from "react-draggable";
import { setActive } from "../../store/reducers/apps/settings";
import { useAppDispatch } from "@/store/hooks";

export default function MissingPermissionCamera() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  return (
    <Draggable handle=".TopBar">
      <div
        className={`Window ${isActive && "active"}`}
        style={{ width: "450px" }}
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
          title="Missing permission"
          content="Please grant permission in order to take photos and videos."
        >
          <WindowBodyButton>
            <button
              className="Button"
              onClick={() => {
                setIsActive(false);
                dispatch(setActive(true));
              }}
              key={Math.random()}
            >
              Open Settings...
            </button>
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
