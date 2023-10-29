import { useEffect, useState, useRef } from "react";
import { activePanel, inactivePanel } from "@/store/reducers/panel";
import { setHeaderType, setWidth } from "@/store/reducers/header";
import Task from "@/components/header/Task";
import Home from "@/components/header/Home";
import Panel from "./panel/Panel";
import { setActive, setSettings } from "@/store/reducers/apps/settings";
import AppMenu from "@/components/header/AppMenu";
import PanelType from "./panel/PanelType";
import useTime from "@/hooks/useTime";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Header() {
  const dispatch = useAppDispatch();
  const headerActive = useAppSelector((state) => state.header.active);
  const headerHide = useAppSelector((state) => state.header.hide);
  const headerProMode = useAppSelector((state) => state.header.proMode);
  const headerType = useAppSelector((state) => state.header.type);
  const headerWidth = useAppSelector((state) => state.header.width);
  const panelActive = useAppSelector((state) => state.panel.active);
  const settingsReducer = useAppSelector((state) => state.settings);
  const batteryChargingStatus = useAppSelector(
    (state) => state.system.battery.charging
  );
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const [wifiPanelActive, setWifiPanelActive] = useState<boolean>(false);
  const [batteryPanelActive, setBatteryPanelActive] = useState<boolean>(false);
  const [bluetoothPanelActive, setBluetoothPanelActive] =
    useState<boolean>(false);
  const [brightnessPanelActive, setBrightnessPanelActive] =
    useState<boolean>(false);
  const [volumePanelActive, setVolumePanelActive] = useState<boolean>(false);
  const [curDate, setCurDate] = useState(
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
    })
  );
  const { timeFormat } = useTime();
  const { t } = useTranslation();
  const batteryPercent = useAppSelector((state) => state.system.battery.level);
  const batteryIsCharging = useAppSelector(
    (state) => state.system.battery.charging
  );

  useEffect(() => {
    setInterval(() => {
      setCurDate(
        new Date().toLocaleString("en-US", {
          dateStyle: "medium",
        })
      );
    }, 1000);
  }, []);

  function useOutsidePanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          dispatch(inactivePanel());
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const panelRef = useRef(null);
  useOutsidePanel(panelRef);

  function useOutsideWifiPanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setWifiPanelActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wifiPanelRef = useRef(null);
  useOutsideWifiPanel(wifiPanelRef);

  function useOutsideBatteryPanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBatteryPanelActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const batteryPanelRef = useRef(null);
  useOutsideBatteryPanel(batteryPanelRef);

  function useOutsideBluetoothPanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBluetoothPanelActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const bluetoothPanelRef = useRef(null);
  useOutsideBluetoothPanel(bluetoothPanelRef);

  function useOutsideBrightnessPanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setBrightnessPanelActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const brightnessPanelRef = useRef(null);
  useOutsideBrightnessPanel(brightnessPanelRef);

  function useOutsideVolumePanel(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setVolumePanelActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const volumePanelRef = useRef(null);
  useOutsideVolumePanel(volumePanelRef);

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
      } ${headerHide ? "hide" : ""}`}
      style={{ width: `${headerWidth}px` }}
    >
      <div
        className={`notifications ${
          headerType === "notifications" ? "active" : ""
        }`}
      >
        <div className="Icon">
          {settingsReducer.notifications ? (
            <i className="fa-solid fa-bell-slash" />
          ) : (
            <i className="fa-solid fa-bell" />
          )}
        </div>
        <div className="Text">
          <p className="font-bold">
            {settingsReducer.notifications
              ? t("header.notifications.off")
              : t("header.notifications.on")}
          </p>
        </div>
      </div>
      <div
        className={`lowbattery ${headerType === "lowbattery" ? "active" : ""}`}
      >
        <div className="LowBatteryText">
          <p className="font-bold">{t("header.lowBattery")}</p>
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
            {batteryPercent === 100
              ? t("header.fullyCharged")
              : t("header.charging")}
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
              onClick={() => {
                dispatch(setActive(true));
                dispatch(setSettings("Date & Time"));
              }}
            >
              <p>{timeFormat}</p>
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
                    batteryIsCharging ? "in-charge" : ""
                  }`}
                >
                  {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
                </p>
              </div>
              {settingsReducer.airplaneMode ? (
                <i key={Math.random()} className="fa-solid fa-plane" />
              ) : (
                ""
              )}
              {settingsReducer.wifi ? (
                <i key={Math.random()} className="fa-solid fa-wifi" />
              ) : (
                ""
              )}
              <i key={Math.random()} className="fa-solid fa-volume" />
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
                <i className="fa-regular fa-chevron-down" />
                <Panel />
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
                <i className="fa-regular fa-bluetooth" />
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
                  <i className="fa-regular fa-battery-bolt" />
                ) : batteryPercent <= 10 ? (
                  <i
                    className="fa-regular fa-battery-exclamation"
                    style={{ color: "#bd3a35" }}
                  />
                ) : (
                  <i className="fa-regular fa-battery-full" />
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
                  <i className="fa-regular fa-wifi" />
                ) : (
                  <i className="fa-regular fa-wifi-slash" />
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
                <i className="fa-regular fa-brightness" />
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
                <i className="fa-regular fa-volume" />
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
                <span>{timeFormat}</span>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
