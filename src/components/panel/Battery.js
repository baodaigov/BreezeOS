import { useEffect } from "react";
import { useBattery } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import { setCharging } from "../../reducers/battery";
import "./Panel.scss";

export default function Battery() {
  const batteryChargingStatus = useSelector((state) => state.battery.charging);
  const dispatch = useDispatch();

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  if (batteryState.charging) {
    dispatch(setCharging(true));
  } else {
    dispatch(setCharging(false));
  }

  return (
    <div className="PanelItem font-bold">
      {batteryChargingStatus ? (
        <i className="fa-regular fa-battery-bolt" />
      ) : (
        <i className="fa-regular fa-battery-full" />
      )}
      <p className="PanelBatteryLevel">
        {isNaN(batteryPercent) ? "-" : batteryPercent + "%"}
      </p>
    </div>
  );
}
