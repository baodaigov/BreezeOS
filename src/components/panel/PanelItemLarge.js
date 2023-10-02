import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAirplaneModeOff,
  toggleAirplaneModeOn,
  toggleBluetooth,
  toggleWifi,
  toggleLightMode,
  toggleDarkMode,
  enableBoldText,
  disableBoldText,
} from "../../reducers/settings";
import { switchType } from "../../reducers/panel";
import "./Panel.scss";
import { useTranslation } from "react-i18next";

const PanelItemLarge = ({ type }) => {
  const { t } = useTranslation();
  const settingsReducer = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const [isActive, setActive] = useState(true);

  const nightShift = () => {
    setActive(!isActive);
    document
      .getElementsByClassName("Desktop")[0]
      .classList.toggle("NightShiftEnabled");
  };

  switch (type) {
    case "wifi":
      return (
        <div
          className={`PanelItemLarge ${settingsReducer.wifi ? "focused" : ""}`}
          style={{ padding: 0 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 17px",
              width: "126px",
            }}
            onClick={() => dispatch(toggleWifi())}
          >
            <i
              className={`fa-solid ${
                settingsReducer.wifi ? "fa-wifi" : "fa-wifi-slash"
              }`}
            />
            <p
              className={`${
                settingsReducer.wifi ? "font-medium" : "font-bold"
              } activeAnimation ${settingsReducer.wifi ? "minimize" : ""}`}
            >
              Wi-Fi
            </p>
            <p
              className={`PanelItemName ${
                settingsReducer.wifi ? "active" : ""
              } font-bold`}
            >
              BreezeOS
            </p>
          </div>
          <div
            className="PanelItemNext"
            onClick={() => dispatch(switchType("wifi"))}
          >
            <i className="fa-regular fa-chevron-right" />
          </div>
        </div>
      );
    case "bluetooth":
      return (
        <div
          className={`PanelItemLarge ${
            settingsReducer.bluetooth ? "focused" : ""
          }`}
          style={{ padding: 0 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "12px 17px",
              width: "126px",
            }}
            onClick={() => dispatch(toggleBluetooth())}
          >
            <i className="fa-solid fa-bluetooth" />
            <p className="font-bold">Bluetooth</p>
          </div>
          <div
            className="PanelItemNext"
            onClick={() => dispatch(switchType("bluetooth"))}
          >
            <i className="fa-regular fa-chevron-right" />
          </div>
        </div>
      );
    case "dark-mode":
      return (
        <>
          {settingsReducer.themeLight ? (
            <div
              className="PanelItemLarge"
              onClick={() => dispatch(toggleDarkMode())}
            >
              <i className="fa-solid fa-circle-half-stroke" />
              <p className="font-bold">{t("panel.darkMode")}</p>
            </div>
          ) : (
            <div
              className="PanelItemLarge focused"
              onClick={() => dispatch(toggleLightMode())}
            >
              <i className="fa-solid fa-circle-half-stroke" />
              <p className="font-bold">{t("panel.darkMode")}</p>
            </div>
          )}
        </>
      );
    case "airplane-mode":
      return (
        <>
          {settingsReducer.airplaneMode ? (
            <div
              className="PanelItemLarge focused"
              onClick={() => dispatch(toggleAirplaneModeOff())}
            >
              <i className="fa-solid fa-plane" />
              <p className="font-bold">{t("panel.airplaneMode")}</p>
            </div>
          ) : (
            <div
              className="PanelItemLarge"
              onClick={() => dispatch(toggleAirplaneModeOn())}
            >
              <i className="fa-solid fa-plane" />
              <p className="font-bold">{t("panel.airplaneMode")}</p>
            </div>
          )}
        </>
      );
    case "night-light":
      return (
        <div
          className={`PanelItemLarge ${isActive ? "" : "focused"}`}
          onClick={nightShift}
        >
          <i className="fa-regular fa-brightness" />
          <p className="font-bold">{t("panel.nightLight")}</p>
        </div>
      );
    case "bold-text":
      return (
        <>
          {settingsReducer.boldText ? (
            <div
              className="PanelItemLarge focused"
              onClick={() => dispatch(disableBoldText())}
            >
              <i className="fa-solid fa-b" />
              <p className="font-bold">{t("panel.boldText")}</p>
            </div>
          ) : (
            <div
              className="PanelItemLarge"
              onClick={() => dispatch(enableBoldText())}
            >
              <i className="fa-solid fa-b" />
              <p className="font-bold">{t("panel.boldText")}</p>
            </div>
          )}
        </>
      );
    default:
      return (
        <div className="PanelItemLarge font-bold">
          Please define a specific type.
        </div>
      );
  }
};

export default PanelItemLarge;
