import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useTime() {
  const is12Hour = useSelector((state) => state.time.hour12);
  const secEnabled = useSelector((state) => state.time.seconds);
  const [hour, setHour] = useState(new Date().getHours());
  const [min, setMin] = useState(new Date().getMinutes());
  const [sec, setSec] = useState(new Date().getSeconds());
  const fullHour = `${
    is12Hour && hour > 12 ? addZero(hour - 12) : addZero(hour)
  }`;
  const fullMin = addZero(min);
  const fullSec = `${secEnabled ? addZero(sec) : ""}`;
  const amPm = `${is12Hour ? (hour >= 12 ? "PM" : "AM") : ""}`;
  const timeFormat = `${fullHour}:${fullMin}${
    secEnabled ? `:` : ""
  }${fullSec} ${amPm}`;

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

  return {
    hour,
    fullHour,
    min,
    fullMin,
    sec,
    fullSec,
    timeFormat,
  };
}
