import { useEffect, useState, useRef } from "react";
import "./Clock.scss";
import Draggable from "react-draggable";
import ActMenu, { ActMenuSelector } from "../menu";
import { useSelector, useDispatch } from "react-redux";
import {
  removeClock,
  displaySeconds,
  changeClockStyle,
} from "../../../reducers/widget";

const Clock = () => {
  const [hour, setHour] = useState(null);
  const [min, setMin] = useState(null);
  const [sec, setSec] = useState(null);
  const [contextMenuEnabled, setContextMenuEnabled] = useState(false);
  const dispatch = useDispatch();
  const clock = useSelector((state) => state.widget.clock);

  useEffect(() => {
    if ((hour, min, sec === null)) {
      setHour(new Date().getHours() * 30);
      setMin(new Date().getMinutes() * 6);
      setSec(new Date().getSeconds() * 6);
    } else {
      setInterval(() => {
        setHour(new Date().getHours() * 30);
        setMin(new Date().getMinutes() * 6);
        setSec(new Date().getSeconds() * 6);
      }, 1000);
    }
  }, [hour, min, sec]);

  function useOutsideMenu(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setContextMenuEnabled(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideMenu(contextMenuRef);

  function onContextMenu(e) {
    e.preventDefault();
    setContextMenuEnabled(true);
  }

  function displayseconds() {
    setContextMenuEnabled(false);
    dispatch(displaySeconds(!clock.seconds));
  }

  function changeStyle(style) {
    setContextMenuEnabled(false);
    dispatch(changeClockStyle(style));
  }

  return (
    <Draggable handle=".ClockWidgetContainer">
      <div
        className={`ClockWidget ${clock.active ? "active" : ""} ${clock.style}`}
        onContextMenu={onContextMenu}
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
          {/* <ActMenuSelector
            title="Change style"
            onClick={changeStyle}
          ></ActMenuSelector> */}
          {clock.style === "default" ? (
            <ActMenuSelector
              title="Default"
              onClick={() => changeStyle("default")}
              active
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Default"
              onClick={() => changeStyle("default")}
            ></ActMenuSelector>
          )}
          {clock.style === "latte" ? (
            <ActMenuSelector
              title="Latte"
              onClick={() => changeStyle("latte")}
              active
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Latte"
              onClick={() => changeStyle("latte")}
            ></ActMenuSelector>
          )}
          {clock.style === "nautilus" ? (
            <ActMenuSelector
              title="Nautilus"
              onClick={() => changeStyle("nautilus")}
              active
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Nautilus"
              onClick={() => changeStyle("nautilus")}
            ></ActMenuSelector>
          )}
          {clock.style === "classic" ? (
            <ActMenuSelector
              title="Classic"
              onClick={() => changeStyle("classic")}
              active
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Classic"
              onClick={() => changeStyle("classic")}
            ></ActMenuSelector>
          )}
          {clock.style === "darkclassic" ? (
            <ActMenuSelector
              title="Dark Classic"
              onClick={() => changeStyle("darkclassic")}
              active
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Dark Classic"
              onClick={() => changeStyle("darkclassic")}
            ></ActMenuSelector>
          )}
          {clock.seconds ? (
            <ActMenuSelector
              title="Display seconds"
              active
              onClick={displayseconds}
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Display seconds"
              onClick={displayseconds}
            ></ActMenuSelector>
          )}
        </ActMenu>
        <div className="CloseButtonContainer">
          <div
            className="CloseButton"
            onClick={() => setTimeout(() => dispatch(removeClock()), 150)}
          >
            <i className="fa-regular fa-xmark"></i>
          </div>
        </div>
        <div className="ClockWidgetContainer">
          <div
            className="Hour"
            style={{
              transform: `rotateZ(${hour}deg)`,
            }}
          />
          <div
            className="Min"
            style={{
              transform: `rotateZ(${min}deg)`,
            }}
          />
          <div
            className={`Sec ${clock.seconds ? "active" : ""}`}
            style={{
              transform: `rotateZ(${sec}deg)`,
            }}
          />
          <div className="Time">
            <span>
              {hour / 30 < 10 && "0"}
              {hour / 30}
            </span>
            <span className="TimeSeparator"></span>
            <span>
              {min / 6 < 10 && "0"}
              {min / 6}
            </span>
            {clock.seconds && (
              <span className="TimeSec">
                {sec / 6 < 10 && "0"}
                {sec / 6}
              </span>
            )}
          </div>
          <span className={`Number twelve ${hour === 360 && "active"}`}></span>
          <span className={`Number three ${hour === 450 && "active"}`}></span>
          <span className={`Number six ${hour === 540 && "active"}`}></span>
          <span className={`Number nine ${hour === 630 && "active"}`}></span>
        </div>
      </div>
    </Draggable>
  );
};

export default Clock;
