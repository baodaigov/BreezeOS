import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function useTime() {
  const is12Hour = useAppSelector((state) => state.time.hour12);
  const secEnabled = useAppSelector((state) => state.time.seconds);
  const [hour, setHour] = useState<number>(new Date().getHours());
  const [min, setMin] = useState<number>(new Date().getMinutes());
  const [sec, setSec] = useState<number>(new Date().getSeconds());
  const fullHour = `${
    is12Hour && hour > 12 ? addZero(hour - 12) : addZero(hour)
  }`;
  const fullMin = addZero(min);
  const fullSec = `${secEnabled ? addZero(sec) : ""}`;
  const amPm = `${is12Hour ? (hour >= 12 ? "PM" : "AM") : ""}`;
  const timeFormat = `${fullHour}:${fullMin}${
    secEnabled ? `:` : ""
  }${fullSec} ${amPm}`;

  function addZero(i: any) {
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
