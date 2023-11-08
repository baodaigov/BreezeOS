import ActMenu, { ActMenuSelector } from "../utils/menu/index";
import { setActive, setSettings } from "../../store/reducers/apps/settings";
import { insertPasswordFor } from "../../store/reducers/wifipassword";
import {
  setVolume,
  setBrightness,
  toggleBluetooth,
  toggleWifi,
} from "../../store/reducers/settings";
import { toggleActive } from "../../store/reducers/newwifi";
import PanelRangeContainer from "./PanelRangeContainer";
import RangeSlider from "../utils/range";
import VolumeAdjustSound from "../../sounds/Oxygen-Sys-Special.mp3";
import "./Panel.scss";
import Toggle from "../utils/toggle";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPanelType } from "@/store/reducers/panel";

interface PanelTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  onActive?: boolean;
  canSwitchBack?: boolean;
}

export default function PanelType({
  type,
  onActive,
  canSwitchBack,
  style,
  ...props
}: PanelTypeProps) {
  const settings = useAppSelector((state) => state.settings);
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const dispatch = useAppDispatch();
  const brightnessElem = document.getElementById(
    "brightness"
  ) as HTMLDivElement;
  const batteryPercent = useAppSelector((state) => state.system.battery.level);
  const batteryIsCharging = useAppSelector(
    (state) => state.system.battery.charging
  );

  function connectWifi(e: string) {
    dispatch(setActive(true));
    dispatch(insertPasswordFor(e));
  }

  function openSettings(action: any) {
    dispatch(setActive(true));
    dispatch(action);
  }

  function setBrightnessLevel(e: any) {
    dispatch(setBrightness(e));
    brightnessElem.style.opacity = `${(100 - e) / 100}`;
  }

  const PanelTitle = ({ name }: { name: string }) => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {canSwitchBack && (
          <div
            className="BackButton"
            onClick={() => dispatch(setPanelType("default"))}
          >
            <i className="fa-regular fa-chevron-left" />
          </div>
        )}
        <p className="PanelName">{name}</p>
      </div>
    );
  };

  switch (type) {
    case "wifi":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            onActive ? "active" : ""
          }`}
          {...props}
        >
          <div className="PanelTypeContainer">
            <div className={`wifiPanel ${onActive ? "active" : ""}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "330px",
                  padding: "0 5px",
                }}
              >
                <PanelTitle name="Wi-Fi" />
                <Toggle
                  active={settings.wifi}
                  onToggle={() => dispatch(toggleWifi(!settings.wifi))}
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
                            <i className="fa-solid fa-check" />
                            {i.private ? (
                              <i className="fa-solid fa-lock" />
                            ) : (
                              ""
                            )}
                            {i.status === "good" ? (
                              <i className="fa-solid fa-wifi" />
                            ) : i.status === "fair" ? (
                              <i className="fa-duotone fa-wifi-fair" />
                            ) : i.status === "weak" ? (
                              <i className="fa-duotone fa-wifi-weak" />
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
                              <i className="fa-solid fa-lock" />
                            ) : (
                              ""
                            )}
                            {i.status === "good" ? (
                              <i className="fa-solid fa-wifi" />
                            ) : i.status === "fair" ? (
                              <i className="fa-duotone fa-wifi-fair" />
                            ) : i.status === "weak" ? (
                              <i className="fa-duotone fa-wifi-weak" />
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
                  <i className="fa-solid fa-wifi-slash" />
                  <p className="Title font-bold">Wi-Fi Has Turned Off</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    case "battery":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            onActive ? "active" : ""
          }`}
          {...props}
        >
          <div className="PanelTypeContainer">
            <div className={`batteryPanel ${onActive ? "active" : ""}`}>
              <div className="BatteryContent">
                <div className="BatteryHeader">
                  <p>
                    {batteryIsCharging
                      ? "Charging"
                      : batteryPercent <= 10
                      ? "Low Battery"
                      : "Battery"}
                  </p>
                  <p className="BatteryLevel font-bold">{batteryPercent}%</p>
                </div>
                <ActMenu
                  className={onActive ? "active" : ""}
                  style={{ width: "332px" }}
                >
                  <ActMenuSelector
                    title="Battery Preferences..."
                    onClick={() => openSettings(setSettings("Battery"))}
                  />
                </ActMenu>
              </div>
            </div>
          </div>
        </div>
      );
    case "bluetooth":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            onActive ? "active" : ""
          }`}
          {...props}
        >
          <div className="PanelTypeContainer">
            <div className={`bluetoothPanel ${onActive ? "active" : ""}`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "330px",
                  padding: "0 5px",
                }}
              >
                <PanelTitle name="Bluetooth" />
                <Toggle
                  active={settings.bluetooth}
                  onToggle={() =>
                    dispatch(toggleBluetooth(!settings.bluetooth))
                  }
                />
              </div>
              {settings.bluetooth ? (
                <p className="Description">
                  Now discoverable as "{settings.deviceName}"
                </p>
              ) : (
                <div className="BluetoothStatusFalse">
                  <i className="fa-solid fa-bluetooth" />
                  <p className="Title font-bold">Bluetooth Has Turned Off</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    case "brightness":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            onActive ? "active" : ""
          }`}
          {...props}
        >
          <div className="PanelTypeContainer">
            <div className={`defaultPanel ${onActive ? "active" : ""}`}>
              <div
                className="PanelBottom"
                style={{ width: "330px", padding: "10px 0" }}
              >
                <PanelRangeContainer title="Brightness">
                  <RangeSlider
                    value={settings.brightness}
                    min="15"
                    max="100"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setBrightnessLevel(e.target.value)
                    }
                  />
                </PanelRangeContainer>
              </div>
            </div>
          </div>
        </div>
      );
    case "volume":
      return (
        <div
          className={`Panel ${shellTheme === "WhiteSur" ? "whitesur" : ""} ${
            onActive ? "active" : ""
          }`}
          {...props}
        >
          <div className="PanelTypeContainer">
            <div className={`defaultPanel ${onActive ? "active" : ""}`}>
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
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch(setVolume(e.target.value))
                    }
                  />
                </PanelRangeContainer>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
