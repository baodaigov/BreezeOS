import { setBrightness, setVolume } from "@/store/reducers/settings";
import "./Panel.scss";
import VolumeAdjustSound from "@/sounds/Oxygen-Sys-Special.mp3";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PanelType from "./PanelType";
import { useTranslation } from "react-i18next";
import PanelRangeContainer from "./PanelRangeContainer";
import RangeSlider from "../utils/range";
import PanelContainer from "./PanelItemContainer";
import PanelItem from "./PanelItem";
import { setPanelType } from "@/store/reducers/panel";
import PanelItemLarge from "./PanelItemLarge";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {}

const Panel = ({ ...props }: PanelProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.panel.type);
  const settings = useAppSelector((state) => state.settings);
  const shellTheme = useAppSelector((state) => state.shell.theme);
  const brightnessElem = document.getElementById(
    "brightness"
  ) as HTMLDivElement;
  const batteryPercent = useAppSelector((state) => state.system.battery.level);
  const batteryIsCharging = useAppSelector(
    (state) => state.system.battery.charging
  );

  function setBrightnessLevel(e: any) {
    dispatch(setBrightness(e));
    brightnessElem.style.opacity = `${(100 - e) / 100}`;
  }

  return (
    <>
      <div
        className={`Panel ${type === "default" && "active"} ${
          shellTheme === "WhiteSur" ? "whitesur" : ""
        }`}
        {...props}
      >
        <div className="PanelTypeContainer">
          <div className="defaultPanel">
            <div className="PanelTop">
              <PanelItem onClick={() => dispatch(setPanelType("battery"))}>
                {batteryIsCharging ? (
                  <i className="fa-regular fa-battery-bolt" />
                ) : (
                  <i className="fa-regular fa-battery-full" />
                )}
                <p className="PanelBatteryLevel">
                  {batteryPercent ? `${batteryPercent}%` : "-"}
                </p>
              </PanelItem>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <PanelItem type="batterySaver" />
                <PanelItem type="shutdownMenu" />
              </div>
            </div>
            <div className="PanelBottom">
              <PanelRangeContainer title={t("panel.volume")}>
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
              <PanelRangeContainer title={t("panel.brightness")}>
                <RangeSlider
                  value={settings.brightness}
                  min="15"
                  max="100"
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBrightnessLevel(e.target.value)
                  }
                />
              </PanelRangeContainer>
              <PanelContainer>
                <PanelItemLarge type="night-shift" />
                <PanelItemLarge type="wifi" />
              </PanelContainer>
              <PanelContainer>
                <PanelItemLarge type="airplane-mode" />
                <PanelItemLarge type="dark-mode" />
              </PanelContainer>
              <PanelContainer>
                <PanelItemLarge type="bluetooth" />
                <PanelItemLarge type="bold-text" />
              </PanelContainer>
            </div>
          </div>
        </div>
      </div>
      <PanelType type="wifi" onActive={type === "wifi"} canSwitchBack />
      <PanelType type="battery" onActive={type === "battery"} canSwitchBack />
      <PanelType
        type="bluetooth"
        onActive={type === "bluetooth"}
        canSwitchBack
      />
    </>
  );
};

export default Panel;
