import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useTime() {
  const is12Hour = useSelector((state) => state.settings.hour12);
  const [hour, setHour] = useState(new Date().getHours());
  const [min, setMin] = useState(new Date().getMinutes());
  const [sec, setSec] = useState(new Date().getSeconds());
  const [secEnabled, setSecEnabled] = useState(false);
  const timeFormat = `${
    is12Hour && hour > 12 ? addZero(hour - 12) : addZero(hour)
  }:${addZero(min)}${secEnabled ? `:${addZero(sec)}` : ""} ${
    is12Hour ? (hour >= 12 ? "PM" : "AM") : ""
  }`;

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  useEffect(() => {
    setInterval(() => {
      setHour(new Date().getHours());
      setMin(new Date().getMinutes());
      setSec(new Date().getSeconds());
    }, 1000);
  }, []);

  return { timeFormat, setSecEnabled };
}
