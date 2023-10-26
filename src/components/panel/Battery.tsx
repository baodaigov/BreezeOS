import { useBattery } from "react-use";
import { setCharging } from "../../store/reducers/battery";
import "./Panel.scss";
import { inactivePanel } from "../../store/reducers/panel";
import { setActive, setSettings } from "../../store/reducers/apps/settings";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import PanelItem from "./PanelItem";

export default function Battery() {
  const batteryChargingStatus = useAppSelector(
    (state) => state.battery.charging
  );
  const dispatch = useAppDispatch();

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  if (batteryState.charging) {
    dispatch(setCharging(true));
  } else {
    dispatch(setCharging(false));
  }

  return (
    <PanelItem
      onClick={() => {
        dispatch(inactivePanel());
        dispatch(setActive(true));
        dispatch(setSettings("Battery"));
      }}
    >
      {batteryChargingStatus ? (
        <i className="fa-regular fa-battery-bolt" />
      ) : (
        <i className="fa-regular fa-battery-full" />
      )}
      <p className="PanelBatteryLevel">
        {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
      </p>
    </PanelItem>
  );
}
