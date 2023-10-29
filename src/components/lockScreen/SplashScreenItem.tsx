import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

interface SplashScreenItemProps {
  type?: string;
}

export default function SplashScreenItem({ type }: SplashScreenItemProps) {
  const batteryPercent = useAppSelector((state) => state.system.battery.level);
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
          <p>{isNaN(batteryPercent) ? "-" : batteryPercent + "%"}</p>
        </div>
      );
  }
}
