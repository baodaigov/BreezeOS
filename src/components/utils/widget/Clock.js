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
          {clock.style === "matcha" ? (
            <ActMenuSelector
              title="Matcha"
              onClick={() => changeStyle("matcha")}
              active
            ></ActMenuSelector>
          ) : (
            <ActMenuSelector
              title="Matcha"
              onClick={() => changeStyle("matcha")}
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
          <span className="Number twelve"></span>
          <span className="Number three"></span>
          <span className="Number six"></span>
          <span className="Number nine"></span>
        </div>
      </div>
    </Draggable>
  );
};

export default Clock;
