import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activePanel, inactivePanel } from "../reducers/panel";
import { setHeaderType, setWidth } from "../reducers/header";
import Task from "../header/Task";
import Home from "../header/Home";
import Panel from "./panel/Panel";
import { useBattery } from "react-use";
import { setActive } from "../reducers/apps/clock";
import AppMenu from "../header/AppMenu";
import PanelType from "./panel/PanelType";

const Header = (props) => {
  const dispatch = useDispatch();
  const headerActive = useSelector((state) => state.header.active);
  const headerHide = useSelector((state) => state.header.hide);
  const headerProMode = useSelector((state) => state.header.proMode);
  const headerType = useSelector((state) => state.header.type);
  const headerWidth = useSelector((state) => state.header.width);
  const panelActive = useSelector((state) => state.panel.active);
  const panelType = useSelector((state) => state.panel.type);
  const settingsReducer = useSelector((state) => state.settings);
  const batteryChargingStatus = useSelector((state) => state.battery.charging);
  const shellTheme = useSelector((state) => state.shell.theme);
  const [wifiPanelActive, setWifiPanelActive] = useState(false);
  const [batteryPanelActive, setBatteryPanelActive] = useState(false);
  const [bluetoothPanelActive, setBluetoothPanelActive] = useState(false);
  const [brightnessPanelActive, setBrightnessPanelActive] = useState(false);
  const [volumePanelActive, setVolumePanelActive] = useState(false);
  const hour12 = useSelector((state) => state.settings.hour12);
  const [curTime, setCurTime] = useState(null);
  const [curDate, setCurDate] = useState(null);

  useEffect(() => {
    if (curTime === null) {
      setCurTime(
        new Date().toLocaleString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: hour12,
        })
      );
    } else {
      setInterval(() => {
        setCurTime(
          new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: hour12,
          })
        );
      }, 1000);
    }
    if (curDate === null) {
      setCurDate(
        new Date().toLocaleString("en-US", {
          dateStyle: "medium",
        })
      );
    } else {
      setInterval(() => {
        setCurDate(
          new Date().toLocaleString("en-US", {
            dateStyle: "medium",
          })
        );
      }, 1000);
    }
  }, [curTime, hour12, curDate]);

  function useOutsidePanel(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(inactivePanel());
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

  const panelRef = useRef(null);
  useOutsidePanel(panelRef);

  function useOutsideWifiPanel(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setWifiPanelActive(false);
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

  const wifiPanelRef = useRef(null);
  useOutsideWifiPanel(wifiPanelRef);

  function useOutsideBatteryPanel(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBatteryPanelActive(false);
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

  const batteryPanelRef = useRef(null);
  useOutsideBatteryPanel(batteryPanelRef);

  function useOutsideBluetoothPanel(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBluetoothPanelActive(false);
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

  const bluetoothPanelRef = useRef(null);
  useOutsideBluetoothPanel(bluetoothPanelRef);

  function useOutsideBrightnessPanel(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBrightnessPanelActive(false);
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

  const brightnessPanelRef = useRef(null);
  useOutsideBrightnessPanel(brightnessPanelRef);

  function useOutsideVolumePanel(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setVolumePanelActive(false);
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

  const volumePanelRef = useRef(null);
  useOutsideVolumePanel(volumePanelRef);

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  useEffect(() => {
    if (headerProMode === true) {
      if (batteryChargingStatus) {
        dispatch(setHeaderType(""));
        dispatch(setWidth(580));
        setTimeout(() => {
          dispatch(setHeaderType("charging"));
        }, 200);
        setTimeout(() => {
          dispatch(setHeaderType(""));
          dispatch(setWidth(900));
        }, 2350);
        setTimeout(() => {
          dispatch(setHeaderType("default"));
        }, 2500);
      }

      if (batteryPercent <= 10) {
        dispatch(setHeaderType(""));
        dispatch(setWidth(580));
        setTimeout(() => {
          dispatch(setHeaderType("lowbattery"));
        }, 200);
        setTimeout(() => {
          dispatch(setHeaderType(""));
          dispatch(setWidth(900));
        }, 2350);
        setTimeout(() => {
          dispatch(setHeaderType("default"));
        }, 2500);
      }
    }
  }, [headerProMode, batteryPercent]);

  return (
    <div
      className={`Header ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
        headerActive ? "active" : ""
      } ${
        headerHide ? "hide" : ""
      }`}
      style={{ width: `${headerWidth}px` }}
    >
      <div
        className={`notifications ${
          headerType === "notifications" ? "active" : ""
        }`}
      >
        <div className="Icon">
          {settingsReducer.notifications ? (
            <i className="fa-solid fa-bell-slash"></i>
          ) : (
            <i className="fa-solid fa-bell"></i>
          )}
        </div>
        <div className="Text">
          <p className="font-bold">
            {settingsReducer.notifications ? "Off" : "On"}
          </p>
        </div>
      </div>
      <div
        className={`lowbattery ${headerType === "lowbattery" ? "active" : ""}`}
      >
        <div className="LowBatteryText">
          <p className="font-bold">Low Battery</p>
        </div>
        <div className="BatteryLevel">
          <p className="BatteryLevelText font-bold">
            {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
          </p>
        </div>
      </div>
      <div className={`charging ${headerType === "charging" ? "active" : ""}`}>
        <div className="ChargingText">
          <p className="font-bold">
            {batteryPercent === 100 ? "Fully Charged" : "Charging"}
          </p>
        </div>
        <div className="BatteryLevel">
          <p className="BatteryLevelText font-bold">
            {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
          </p>
        </div>
      </div>
      <div className={`default ${headerType === "default" ? "active" : ""}`}>
        <div className="Header-left">
          <Home />
          {shellTheme !== "WhiteSur" ? (
            <div
              className="Time Header-item"
              onClick={() => dispatch(setActive(true))}
            >
              <p>{curTime}</p>
            </div>
          ) : (
            ""
          )}
          {shellTheme === "WhiteSur" ? <AppMenu /> : ""}
        </div>
        <div className="Header-right">
          {shellTheme !== "WhiteSur" ? (
            <Task>
              <div
                className={`BatteryStatus ${
                  batteryPercent <= 10 ? "low-battery" : ""
                }`}
              >
                <p
                  className={`BatteryStatusLevel font-bold ${
                    batteryState.charging ? "in-charge" : ""
                  }`}
                >
                  {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
                </p>
              </div>
              {settingsReducer.airplaneMode ? (
                <i key={Math.random()} className="fa-solid fa-plane"></i>
              ) : (
                ""
              )}
              {settingsReducer.wifi ? (
                <i key={Math.random()} className="fa-solid fa-wifi"></i>
              ) : (
                ""
              )}
              <i key={Math.random()} className="fa-solid fa-volume"></i>
            </Task>
          ) : (
            ""
          )}
          {shellTheme === "WhiteSur" ? (
            <>
              <div
                className={`Header-item ${panelActive ? "active" : ""}`}
                onMouseDown={() => (panelActive ? "" : dispatch(activePanel()))}
                ref={panelRef}
              >
                <i className="fa-regular fa-chevron-down"></i>
                <Panel
                  style={{
                    height:
                      panelType === "default"
                        ? "340px"
                        : panelType === "wifi"
                        ? "545px"
                        : panelType === "bluetooth"
                        ? "545px"
                        : "340px",
                  }}
                />
              </div>
              <div
                className={`Header-item ${
                  settingsReducer.bluetooth ? "" : "disabled"
                } ${bluetoothPanelActive ? "active" : ""}`}
                onMouseDown={() =>
                  bluetoothPanelActive ? "" : setBluetoothPanelActive(true)
                }
                ref={bluetoothPanelRef}
              >
                <i className="fa-regular fa-bluetooth"></i>
                <PanelType
                  type="bluetooth"
                  onActive={bluetoothPanelActive ? true : false}
                  style={{ height: "545px", right: "300px" }}
                />
              </div>
              <div
                className={`Header-item ${batteryPanelActive ? "active" : ""}`}
                onMouseDown={() =>
                  batteryPanelActive ? "" : setBatteryPanelActive(true)
                }
                ref={batteryPanelRef}
              >
                {batteryChargingStatus ? (
                  <i className="fa-regular fa-battery-bolt"></i>
                ) : batteryPercent <= 10 ? (
                  <i
                    className="fa-regular fa-battery-exclamation"
                    style={{ color: "#bd3a35" }}
                  ></i>
                ) : (
                  <i className="fa-regular fa-battery-full"></i>
                )}
                <PanelType
                  type="battery"
                  onActive={batteryPanelActive ? true : false}
                  style={{ height: "80px", right: "268px" }}
                />
              </div>
              <div
                className={`Header-item ${
                  settingsReducer.wifi ? "" : "disabled"
                } ${wifiPanelActive ? "active" : ""}`}
                onMouseDown={() =>
                  wifiPanelActive ? "" : setWifiPanelActive(true)
                }
                ref={wifiPanelRef}
              >
                {settingsReducer.wifi ? (
                  <i className="fa-regular fa-wifi"></i>
                ) : (
                  <i className="fa-regular fa-wifi-slash"></i>
                )}
                <PanelType
                  type="wifi"
                  onActive={wifiPanelActive ? true : false}
                  style={{ height: "585px", right: "232px" }}
                />
              </div>
              <div
                className={`Header-item ${
                  brightnessPanelActive ? "active" : ""
                }`}
                onMouseDown={() =>
                  brightnessPanelActive ? "" : setBrightnessPanelActive(true)
                }
                ref={brightnessPanelRef}
              >
                <i className="fa-regular fa-brightness"></i>
                <PanelType
                  type="brightness"
                  onActive={brightnessPanelActive ? true : false}
                  style={{ height: "90px", right: "198px" }}
                />
              </div>
              <div
                className={`Header-item ${volumePanelActive ? "active" : ""}`}
                onMouseDown={() =>
                  volumePanelActive ? "" : setVolumePanelActive(true)
                }
                ref={volumePanelRef}
              >
                <i className="fa-regular fa-volume"></i>
                <PanelType
                  type="volume"
                  onActive={volumePanelActive ? true : false}
                  style={{ height: "90px", right: "163px" }}
                />
              </div>
              <div
                className="Header-item DateNTime"
                onClick={() => dispatch(setActive(true))}
              >
                <span style={{ marginRight: "10px" }}>{curDate}</span>
                <span>{curTime}</span>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
