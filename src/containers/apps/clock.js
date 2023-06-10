import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setActive, setHide} from "../../reducers/apps/clock";
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/clock.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const ClockApp = () => {
    const isActive = useSelector(state => state.appsClock.active);
    const isHide = useSelector(state => state.appsClock.hide);
    const dispatch = useDispatch();

    document.addEventListener('keydown', (e) => {
        if(e.ctrlKey && e.keyCode === 52){
            dispatch(setActive(true));
        }
    });

    useEffect(() => {
        if(isActive){
            document.getElementsByClassName('ClockApp')[0].classList.add('clicked');
            setTimeout(() => document.getElementsByClassName('clock')[0].classList.add('active'), 500);
        } else {
            document.getElementsByClassName('ClockApp')[0].classList.remove('clicked');
            document.getElementsByClassName('clock')[0].classList.remove('active');
        }
        if(isHide){
            document.getElementsByClassName('ClockApp')[0].classList.add('hide');
            document.getElementsByClassName('clock')[0].classList.add('hide');
        } else {
            document.getElementsByClassName('ClockApp')[0].classList.remove('hide');
            document.getElementsByClassName('clock')[0].classList.remove('hide');
        }
    }, [isActive, isHide]);
    
	return (
        <DockItem id='clock' class="ClockApp" title='Clock' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg' onClick={() => isHide ? dispatch(setHide(false)) : dispatch(setActive(true))}/>
	)
};

export const ClockStartApp = () => {
    const dispatch = useDispatch();
    const isHide = useSelector(state => state.appsClock.hide);
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        if(isHide){
            dispatch(setHide(false));
        } else {
            dispatch(setActive(true));
        }
    };

    return (
        <StartApp key='clock' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/preferences-system-time.svg' name='Clock' onClick={toggle}/>
    )
}

export default function Clock() {
    const dispatch = useDispatch();

    const ClockWindow = () => {
        const [min, isMin] = useState(false);
        const [tab, setTab] = useState('worldclock');
        const [translateX, setTranslateX] = useState('');
        const [width, setWidth] = useState('103px');
        const [value, setValue] = useState('1');
        
        function worldClockTab(){
            setTranslateX('translate(0)');
            setWidth('103px');
            setValue('1');
            setTab('worldclock');
        }
    
        function alarmTab(){
            setTranslateX('translate(106px)');
            setWidth('70px');
            setValue('2');
            setTab('alarm');
        }
    
        function stopwatchTab(){
            setTranslateX('translate(180.4px)');
            setWidth('97px');
            setValue('3');
            setTab('stopwatch');
        }
    
        function timerTab(){
            setTranslateX('translate(280px)');
            setWidth('72px');
            setValue('4');
            setTab('timer');
        }

        const ClockItem = (props) => {
            const [curTime, setCurTime] = useState(null);
            const [curDate, setCurDate] = useState(null);

            useEffect(() => {
                if(curTime == null && curDate == null){
                    setCurTime(new Date().toLocaleString('vi-VN', {
                        timeZone: `${props.timeZone}`,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }));
            
                    setCurDate(new Date().toLocaleDateString('en-US', {
                        timeZone: `${props.timeZone}`,
                        dateStyle: "full"
                    }));
                } else {
                    setInterval(() => {
                        setCurTime(new Date().toLocaleString('vi-VN', {
                            timeZone: `${props.timeZone}`,
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        }));
                
                        setCurDate(new Date().toLocaleDateString('en-US', {
                            timeZone: `${props.timeZone}`,
                            dateStyle: "full"
                        }));
                    }, 1000);
                }
            }, [curTime, curDate])
        
            return (
                <div className='ClockItem'>
                    <div className='ClockInfo'>
                        <p className='ClockTitle'>{props.title}</p>
                        <p className='ClockDesc'>{curDate}</p>
                    </div>
                    <div>
                        <div className='ClockTime'>
                            <p className='font-bold'>{curTime}</p>
                        </div>
                    </div>
                </div>
            )
        }

        const [alarm, setAlarm] = useState([]);
        const [alarmSettings, showAlarmSettings] = useState(false);
        const [settings, allowSettings] = useState(false);

        function addNewAlarm(){
            let newAlarm = [...alarm];
            let newTitle = `Alarm ${alarm.length + 1}`;
            newAlarm = [...newAlarm, {id: newTitle, time: '07:00 AM'}];
            setAlarm(newAlarm);
            showAlarmSettings(false);
        }
        
        function removeAlarm(index){
            const deleteAlarm = alarm && alarm.filter((element , i) => i !== index);
            setAlarm(deleteAlarm);
        }

        var mouseHold;

        function mouseUp(){
            if(mouseHold) window.clearTimeout(mouseHold);
            addNewAlarm();
        }

        function mouseDown(){
            mouseHold = window.setTimeout(() => showAlarmSettings(true), 800);
        }

        function editAlarm(){
            allowSettings(!settings);
            showAlarmSettings(false);
        }

        const [time, setTime] = useState(0);
        const [running, setRunning] = useState(false);
        
        useEffect(() => {
            let interval;
            if(running == true) {
                interval = setInterval(() => {
                    setTime((prevTime) => prevTime + 10);
                }, 10);
            } else if (running == false) {
                clearInterval(interval);
                setTime(0);
            }
            return () => clearInterval(interval);
        }, [running]);
    
        function close(){
            dispatch(setActive(false));
            setTimeout(() => {
                setRunning(false);
            }, 300);
        }
    
        function minimize(){
            document.getElementsByClassName('clock')[0].classList.toggle('minimize');
            isMin(!min)
        }

        function switchTab(){
            switch(tab) {
                case 'worldclock':
                    return (
                        <div className='world-clock'>
                            <ClockItem title='Ho Chi Minh City, Vietnam' timeZone='Asia/Ho_Chi_Minh'/>
                            <ClockItem title='London, United Kingdom' timeZone='Europe/London'/>
                        </div>
                    )
                case 'alarm':
                    return (
                        <div className='alarm'>
                            <div className='AlarmClock'>
                                {alarm.length != 0 ? (
                                    <div className='AlarmContainer'>
                                        {alarm.map((e, index) => 
                                            <div className='AlarmContainerItem'>
                                                {settings ? (
                                                    <div className='AlarmSettings'>
                                                        <i className="fa-regular fa-bars reorder"></i>
                                                        <i class="fa-regular fa-dash delete" onClick={() => removeAlarm(index)}></i>
                                                    </div>
                                                ) : ''}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                                    <p className='AlarmContainerTitle'>{e.id}</p>
                                                    <p className='AlarmContainerTime'>{e.time}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className='NoAlarm'>
                                        <i className="fa-regular fa-alarm-clock" style={{ fontSize: '80px', margin: '20px' }}></i>
                                        <p style={{ fontWeight: '700', fontSize: '20px' }}>No Alarm</p>
                                    </div>
                                )}
                                {alarmSettings ? (
                                    <>
                                        <div className='AlarmItem showSettings' onMouseUp={() => showAlarmSettings(false)}>
                                            <i className="fa-regular fa-xmark"></i>
                                        </div>
                                        <div className={`AlarmItem ${alarm.length == 0 ? 'disable' : ''} edit`} onMouseUp={editAlarm}>
                                            <p className='AlarmItemTitle'>Edit</p>
                                            <i className="fa-regular fa-pen"></i>
                                        </div>
                                        <div className='AlarmItem settings' onMouseUp={() => showAlarmSettings(false)}>
                                            <p className='AlarmItemTitle'>Settings</p>
                                            <i className="fa-regular fa-gear"></i>
                                        </div>
                                    </>
                                ) : settings ? (
                                    <div className='AlarmItem done' onMouseUp={() => allowSettings(false)}>
                                        <i className="fa-regular fa-check"></i>
                                    </div>
                                ) : (
                                    <div className='AlarmItem' onMouseDown={mouseDown} onMouseUp={mouseUp}>
                                        <i className="fa-regular fa-plus"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                case 'stopwatch':
                    return (
                        <div className='stopwatch'>
                            <div className='StopwatchTimer'>
                                <div style={{ textAlign: 'center', width: '90px' }}>
                                    <span className='active'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>
                                </div>
                                <span className={running ? 'blinking' : ''}>:</span>
                                <div style={{ textAlign: 'center', width: '180px', display: 'flex' }}>
                                    <span className='active'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                    <div>
                                        .
                                        <span className='StopwatchMs'>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
                                    </div>
                                </div>
                            </div>
                            {running ? <div className='StopwatchButton stop' onClick={() => setRunning(false)}>Stop</div> : <div className='StopwatchButton start' onClick={() => setRunning(true)}>Start</div>}
                        </div>
                    )
                case 'timer':
                    return (
                        <div className='timer'>
                            <p>Nothing in this section.</p>
                        </div>
                    )
            }
        }

        return (
            <>
                <TopBar title='Clock' onDblClick={minimize}>
                    <TopBarInteraction action='hide' onHide={() => dispatch(setHide(true))}/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className={`Clock ${alarmSettings ? 'blackscr' : ''}`}>
                        <div className='ClockItems'>
                            {switchTab()}
                        </div>
                        <div className='ClockMenu' value={value}>
                            <div className='ClockMenuInside'>
                                <div className='ClockMenuItem world-clock' onClick={worldClockTab}>
                                    <i className="fa-regular fa-globe"></i>
                                    <p>World Clock</p>
                                </div>
                                <div className='ClockMenuItem alarm-clock' onClick={alarmTab}>
                                    <i className="fa-regular fa-alarm-clock"></i>
                                    <p>Alarm</p>
                                </div>
                                <div className='ClockMenuItem stopwatch' onClick={stopwatchTab}>
                                    <i className="fa-regular fa-stopwatch"></i>
                                    <p>Stopwatch</p>
                                </div>
                                <div className='ClockMenuItem timer' onClick={timerTab}>
                                    <i className="fa-regular fa-timer"></i>
                                    <p>Timer</p>
                                </div>
                                <div className='ClockSlider' style={{ width: width, transform: translateX }}></div>
                            </div>
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='ClockWindow'>   
                <div
                    className='Window clock'
                    key={Math.random()}
                >
                    <ClockWindow/>
                </div> 
        </div>
    )
}
