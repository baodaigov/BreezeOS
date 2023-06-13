import { useEffect, useState } from 'react';

const Time = () => {
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
        <div className='DateNTime'>
            <span style={{ marginRight: '15px' }}>{curDate}</span>
            <span>{curTime}</span>
        </div>
    )
}

export default Time;