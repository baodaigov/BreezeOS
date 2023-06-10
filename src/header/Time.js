import { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import {setActive} from "../reducers/apps/clock";

const Time = () => {
  const dispatch = useDispatch();
  const [curTime, setCurTime] = useState(null);

  useEffect(() => {
    setInterval(() => {
      setCurTime(new Date().toLocaleString('en-US', {
        hour: "2-digit",
        minute: "2-digit"
      }));
    }, 1000);
  }, [curTime]);

  return (
    <div className='Time Header-item' onClick={() => dispatch(setActive(true))}>
      <p>{curTime}</p>
    </div>
  )
}

export default Time;