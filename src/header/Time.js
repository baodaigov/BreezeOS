import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActive } from "../reducers/apps/clock";

const Time = () => {
  const TimeContent = () => {
    const hour12 = useSelector((state) => state.settings.hour12);
    const dispatch = useDispatch();
    const [curTime, setCurTime] = useState(null);

    useEffect(() => {
      if (curTime === null) {
        setCurTime(
          new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: hour12,
          })
        );
      } else {
        setInterval(() => {
          setCurTime(
            new Date().toLocaleString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: hour12,
            })
          );
        }, 1000);
      }
    }, [curTime, hour12]);

    return (
      <div
        className="Time Header-item"
        onClick={() => dispatch(setActive(true))}
      >
        <p>{curTime}</p>
      </div>
    );
  };

  return <TimeContent />;
};

export default Time;
