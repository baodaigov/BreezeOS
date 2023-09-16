import { useSelector, useDispatch } from "react-redux";
import ActMenu, { ActMenuSelector } from "../utils/menu/index";
import { setActive, setSettings } from "../../reducers/apps/settings";
import { inactivePanel } from "../../reducers/panel";
import { insertPasswordFor } from "../../reducers/wifipassword";
import {
  setVolume,
  setBrightness,
  toggleBluetooth,
  toggleWifi,
} from "../../reducers/settings";
import { toggleActive } from "../../reducers/newwifi";
import { useBattery } from "react-use";
import PanelRangeContainer from "./PanelRangeContainer";
import RangeSlider from "../utils/range/Range";
import VolumeAdjustSound from "../../sounds/Oxygen-Sys-Special.mp3";
import "./Panel.scss";
import Toggle from "../utils/toggle/Toggle";

const PanelType = (props) => {
  const settings = useSelector((state) => state.settings);
  const shellTheme = useSelector((state) => state.shell.theme);
  const batteryChargingStatus = useSelector((state) => state.battery.charging);
  const dispatch = useDispatch();

  function connectWifi(e) {
    dispatch(setActive(true));
    setTimeout(() => {
      dispatch(insertPasswordFor(e));
    }, 800);
  }

  function openSettings(action) {
    dispatch(setActive(true));
    setTimeout(() => {
      dispatch(action);
    }, 800);
  }

  function setBrightnessLevel(e) {
    dispatch(setBrightness(e));
    document.getElementById("brightness").style.opacity = (100 - e) / 100;
  }

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  switch (props.type) {
    case "wifi":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            props.onActive ? "active" : ""
          }`}
          style={props.style}
        >
          <div style={{ position: "relative" }}>
            <div className="PanelTypeContainer">
              <div className={`wifiPanel ${props.onActive ? "active" : ""}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "330px",
                    padding: "0 10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="PanelName">Wi-Fi</p>
                  </div>
                  <Toggle
                    active={settings.wifi}
                    onToggle={() => dispatch(toggleWifi())}
                  />
                </div>
                {settings.wifi ? (
                  <div className="WifiList">
                    {settings.wifiList.map((i) => (
                      <>
                        {i.connected ? (
                          <div className="WifiListItem">
                            <p className="WifiName">{i.name}</p>
                            <div className="WifiListIcon">
                              <i className="fa-solid fa-check"></i>
                              {i.private ? (
                                <i className="fa-solid fa-lock"></i>
                              ) : (
                                ""
                              )}
                              {i.status === "good" ? (
                                <i className="fa-solid fa-wifi"></i>
                              ) : i.status === "fair" ? (
                                <i className="fa-duotone fa-wifi-fair"></i>
                              ) : i.status === "weak" ? (
                                <i className="fa-duotone fa-wifi-weak"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        ) : (
                          <div
                            className="WifiListItem"
                            onClick={() => connectWifi(i.name)}
                          >
                            <p className="WifiName">{i.name}</p>
                            <div className="WifiListIcon">
                              {i.private ? (
                                <i className="fa-solid fa-lock"></i>
                              ) : (
                                ""
                              )}
                              {i.status === "good" ? (
                                <i className="fa-solid fa-wifi"></i>
                              ) : i.status === "fair" ? (
                                <i className="fa-duotone fa-wifi-fair"></i>
                              ) : i.status === "weak" ? (
                                <i className="fa-duotone fa-wifi-weak"></i>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ))}
                    <div
                      className="WifiListItem"
                      onClick={() => openSettings(toggleActive(true))}
                    >
                      <p className="WifiName">Other...</p>
                    </div>
                    <div
                      className="WifiListItem"
                      onClick={() => openSettings(setSettings("Wi-Fi"))}
                    >
                      <p className="WifiName">Wi-Fi Preferences</p>
                    </div>
                  </div>
                ) : (
                  <div className="WifiStatusFalse">
                    <i className="fa-solid fa-wifi-slash"></i>
                    <p className="Title font-bold">Wi-Fi Has Turned Off</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    case "battery":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            props.onActive ? "active" : ""
          }`}
          style={props.style}
        >
          <div style={{ position: "relative" }}>
            <div className="PanelTypeContainer">
              <div className={`batteryPanel ${props.onActive ? "active" : ""}`}>
                <div className="BatteryContent">
                  <div className="BatteryHeader">
                    <p>
                      {batteryState.charging
                        ? "Charging"
                        : batteryPercent <= 10
                        ? "Low Battery"
                        : "Battery"}
                    </p>
                    <p className="BatteryLevel font-bold">{batteryPercent}%</p>
                  </div>
                  <ActMenu
                    className={props.onActive ? "active" : ""}
                    style={{ width: "332px" }}
                  >
                    <ActMenuSelector
                      title="Battery Preferences..."
                      onClick={() => openSettings(setSettings("Battery"))}
                    ></ActMenuSelector>
                  </ActMenu>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "bluetooth":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            props.onActive ? "active" : ""
          }`}
          style={props.style}
        >
          <div style={{ position: "relative" }}>
            <div className="PanelTypeContainer">
              <div
                className={`bluetoothPanel ${props.onActive ? "active" : ""}`}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "330px",
                    padding: "0 10px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="PanelName">Bluetooth</p>
                  </div>
                  <Toggle
                    active={settings.bluetooth}
                    onToggle={() => dispatch(toggleBluetooth())}
                  />
                </div>
                {settings.bluetooth ? (
                  <p className="Description">
                    Now discoverable as "{settings.deviceName}"
                  </p>
                ) : (
                  <div className="BluetoothStatusFalse">
                    <i className="fa-solid fa-bluetooth"></i>
                    <p className="Title font-bold">Bluetooth Has Turned Off</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    case "brightness":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            props.onActive ? "active" : ""
          }`}
          style={props.style}
        >
          <div style={{ position: "relative" }}>
            <div className="PanelTypeContainer">
              <div className={`defaultPanel ${props.onActive ? "active" : ""}`}>
                <div
                  className="PanelBottom"
                  style={{ width: "330px", padding: "10px 0" }}
                >
                  <PanelRangeContainer title="Brightness">
                    <RangeSlider
                      value={settings.brightness}
                      min="15"
                      max="100"
                      onInput={(e) => setBrightnessLevel(e.target.value)}
                    />
                  </PanelRangeContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    case "volume":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            props.onActive ? "active" : ""
          }`}
          style={props.style}
        >
          <div style={{ position: "relative" }}>
            <div className="PanelTypeContainer">
              <div className={`defaultPanel ${props.onActive ? "active" : ""}`}>
                <div
                  className="PanelBottom"
                  style={{ width: "330px", padding: "10px 0" }}
                >
                  <PanelRangeContainer title="Volume">
                    <RangeSlider
                      value={settings.volume}
                      min="0"
                      max="100"
                      onClick={() => new Audio(VolumeAdjustSound).play()}
                      onInput={(e) => dispatch(setVolume(e.target.value))}
                    />
                  </PanelRangeContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
};

export default PanelType;
