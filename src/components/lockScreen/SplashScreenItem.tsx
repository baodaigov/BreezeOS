// @ts-nocheck

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import Temperature from "../Temperature";
import TemperatureIcon from "../TemperatureIcon";

interface SplashScreenItemProps {
  type?: string;
}

export default function SplashScreenItem({ type }: SplashScreenItemProps) {
  const batteryPercent = useAppSelector((state) => state.system.battery.level);
  const temp = useAppSelector((state) => state.weather.data);
  const [curDate, setCurDate] = useState(
    new Date().toLocaleString("en-US", {
      dateStyle: "medium",
    })
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

  switch (type) {
    case "date":
      return (
        <div className="SplashScreenItem">
          <p>{curDate}</p>
        </div>
      );
    case "battery":
      return (
        <div className="SplashScreenItem">
          <i className="fa-regular fa-battery-full SplashScreenIcon" />
          <p>{batteryPercent ? `${batteryPercent}%` : "-"}</p>
        </div>
      );
    case "temp":
      return (
        <div className="SplashScreenItem">
          <TemperatureIcon
            icon={temp.days && temp.days[0].icon}
            className="SplashScreenIcon"
          />
          <Temperature value={temp.days && temp.days[0].temp} enableSymbol />
        </div>
      );
  }
}
