import React, { useEffect, useState, useRef } from "react";
import "./Clock.scss";
import Draggable from "react-draggable";
import ActMenu, { ActMenuSelector } from "@/components/utils/menu";
import {
  removeClock,
  displaySeconds,
  changeClockStyle,
} from "@/store/reducers/widget";
import useTime from "@/hooks/useTime";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const Clock = () => {
  const { fullHour, hour, fullMin, min, fullSec, sec } = useTime();
  const hourDeg = hour * 30;
  const minDeg = min * 6;
  const secDeg = sec * 6;
  const [contextMenuEnabled, setContextMenuEnabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const clock = useAppSelector((state) => state.widget.clock);

  function useOutsideMenu(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setContextMenuEnabled(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideMenu(contextMenuRef);

  function displayseconds() {
    setContextMenuEnabled(false);
    dispatch(displaySeconds(!clock.seconds));
  }

  function changeStyle(style: string) {
    setContextMenuEnabled(false);
    dispatch(changeClockStyle(style));
  }

  return (
    <Draggable handle=".ClockWidgetContainer">
      <div
        className={`ClockWidget ${clock.active ? "active" : ""} ${clock.style}`}
        onContextMenu={() => setContextMenuEnabled(true)}
      >
        <ActMenu
          style={{
            position: "absolute",
            zIndex: "10001",
            top: "100px",
            right: "100px",
            width: "200px",
          }}
          className={contextMenuEnabled ? "active" : ""}
          ref={contextMenuRef}
        >
          <ActMenuSelector
            title="Default"
            onClick={() => changeStyle("default")}
            active={clock.style === "default"}
          />
          <ActMenuSelector
            title="Latte"
            onClick={() => changeStyle("latte")}
            active={clock.style === "latte"}
          />
          <ActMenuSelector
            title="Nautilus"
            onClick={() => changeStyle("nautilus")}
            active={clock.style === "nautilus"}
          />
          <ActMenuSelector
            title="Classic"
            onClick={() => changeStyle("classic")}
            active={clock.style === "classic"}
          />
          <ActMenuSelector
            title="Dark Classic"
            onClick={() => changeStyle("darkclassic")}
            active={clock.style === "darkclassic"}
          />
          <ActMenuSelector
            title="Display seconds"
            onClick={displayseconds}
            active={clock.seconds}
          />
        </ActMenu>
        <div className="CloseButtonContainer">
          <div
            className="CloseButton"
            onClick={() => setTimeout(() => dispatch(removeClock()), 150)}
          >
            <i className="fa-regular fa-xmark" />
          </div>
        </div>
        <div className="ClockWidgetContainer">
          <div
            className="Hour"
            style={{
              transform: `rotateZ(${hourDeg}deg)`,
            }}
          />
          <div
            className="Min"
            style={{
              transform: `rotateZ(${minDeg}deg)`,
            }}
          />
          <div
            className={`Sec ${clock.seconds ? "active" : ""}`}
            style={{
              transform: `rotateZ(${secDeg}deg)`,
            }}
          />
          <div className="Time">
            <span>{fullHour}</span>
            <span className="TimeSeparator"></span>
            <span>{fullMin}</span>
            {clock.seconds && <span className="TimeSec">{fullSec}</span>}
          </div>
          <span
            className={`Number twelve ${hourDeg === 360 && "active"}`}
          ></span>
          <span
            className={`Number three ${hourDeg === 450 && "active"}`}
          ></span>
          <span className={`Number six ${hourDeg === 540 && "active"}`}></span>
          <span className={`Number nine ${hourDeg === 630 && "active"}`}></span>
        </div>
      </div>
    </Draggable>
  );
};

export default Clock;
