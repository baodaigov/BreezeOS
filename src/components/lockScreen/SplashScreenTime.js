import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function SplashScreenTime(){
    const SSTContent = () => {
        const hour12 = useSelector(state => state.settings.hour12);
        const [curTime, setCurTime] = useState(null);
    
        useEffect(() => {
            if(curTime === null){
                setCurTime(new Date().toLocaleString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: hour12
                }));
            } else {
                setInterval(() => {
                    setCurTime(new Date().toLocaleString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: hour12
                    }));
                }, 1000);
            }
        }, [curTime, hour12]);

        return <p className='SplashScreenTitle'>{curTime}</p>
    }

    return <SSTContent/>
}