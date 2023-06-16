import { useEffect, useState } from 'react';
import {useDispatch} from "react-redux";
import {setActive} from "../reducers/apps/clock";

const Time = () => {
    const dispatch = useDispatch();
    const [curDate, setCurDate] = useState(null);
    const [curTime, setCurTime] = useState(null);

    useEffect(() => {
        setInterval(() => {
            setCurTime(new Date().toLocaleString('en-US', {
                hour: "numeric",
                minute: "2-digit"
            }));
            setCurDate(new Date().toLocaleString('en-US', {
                dateStyle: 'medium'
            }));
        }, 1000);
    }, [curTime, curDate]);

    return (
        <div className='Header-item DateNTime' onClick={() => dispatch(setActive(true))}>
            <span style={{ marginRight: '10px' }}>{curDate}</span>
            <span>{curTime}</span>
        </div>
    )
}

export default Time;