import {
  toggleBluetooth,
  toggleWifi,
  toggleLightMode,
  setBoldText,
  toggleAirplaneMode,
} from "@/store/reducers/settings";
import { setPanelType } from "@/store/reducers/panel";
import "./Panel.scss";
import { useTranslation } from "react-i18next";
import { setDesktopNightShift } from "@/store/reducers/desktop";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface PanelItemLargeProps {
  type: string;
}

const PanelItemLarge = ({ type }: PanelItemLargeProps) => {
  const { t } = useTranslation();
  const settingsReducer = useAppSelector((state) => state.settings);
  const nightShift = useAppSelector((state) => state.desktop.nightShift);
  const dispatch = useAppDispatch();

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
            onClick={() => dispatch(toggleWifi(!settingsReducer.wifi))}
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
            onClick={() => dispatch(setPanelType("wifi"))}
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
            onClick={() =>
              dispatch(toggleBluetooth(!settingsReducer.bluetooth))
            }
          >
            <i className="fa-solid fa-bluetooth" />
            <p className="font-bold">Bluetooth</p>
          </div>
          <div
            className="PanelItemNext"
            onClick={() => dispatch(setPanelType("bluetooth"))}
          >
            <i className="fa-regular fa-chevron-right" />
          </div>
        </div>
      );
    case "dark-mode":
      return (
        <div
          className={`PanelItemLarge ${
            !settingsReducer.themeLight && "focused"
          }`}
          onClick={() => dispatch(toggleLightMode(!settingsReducer.themeLight))}
        >
          <i className="fa-solid fa-circle-half-stroke" />
          <p className="font-bold">{t("panel.darkMode")}</p>
        </div>
      );
    case "airplane-mode":
      return (
        <div
          className={`PanelItemLarge ${
            settingsReducer.airplaneMode && "focused"
          }`}
          onClick={() =>
            dispatch(toggleAirplaneMode(!settingsReducer.airplaneMode))
          }
        >
          <i className="fa-solid fa-plane" />
          <p className="font-bold">{t("panel.airplaneMode")}</p>
        </div>
      );
    case "night-shift":
      return (
        <div
          className={`PanelItemLarge ${nightShift && "focused"}`}
          onClick={() => dispatch(setDesktopNightShift(!nightShift))}
        >
          <i className="fa-regular fa-brightness" />
          <p className="font-bold">{t("panel.nightShift")}</p>
        </div>
      );
    case "bold-text":
      return (
        <div
          className={`PanelItemLarge ${settingsReducer.boldText && "focused"}`}
          onClick={() => dispatch(setBoldText(!settingsReducer.boldText))}
        >
          <i className="fa-solid fa-b" />
          <p className="font-bold">{t("panel.boldText")}</p>
        </div>
      );
  }
};

export default PanelItemLarge;
