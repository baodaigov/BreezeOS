import React, { useEffect, useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/calendar.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import dayjs from 'dayjs';
import range from 'lodash-es/range';

export const CalendarApp = () => {

    const toggle = () => {
        document.getElementsByClassName('CalendarApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('calendar')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='calendar' class="CalendarApp" title='Calendar' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg' onClick={toggle}/>
	)
};

export const CalendarStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('CalendarApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('calendar')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='calendar' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/calendar.svg' name='Calendar' onClick={toggle}/>
    )
}

export default function Calendar() {
    const CalendarWindow = () => {
        const [min, isMin] = useState(false);

        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const todayObj = dayjs();

        const [dayObj, setDayObj] = useState(dayjs());

        const thisYear = dayObj.year()
        const thisMonth = dayObj.month() // (January as 0, December as 11)
        const daysInMonth = dayObj.daysInMonth()
      
        const dayObjOf1 = dayjs(`${thisYear}-${thisMonth + 1}-1`)
        const weekDayOf1 = dayObjOf1.day() // (Sunday as 0, Saturday as 6)
      
        const dayObjOfLast = dayjs(`${thisYear}-${thisMonth + 1}-${daysInMonth}`)
        const weekDayOfLast = dayObjOfLast.day()
      
        const handlePrev = () => {
          setDayObj(dayObj.subtract(1, "month"))
        }
      
        const handleNext = () => {
          setDayObj(dayObj.add(1, "month"))
        }

        function close(){
            document.getElementsByClassName('calendar')[0].classList.remove('active');
            document.getElementById('calendar').classList.remove('clicked');
        }

        function minimize(){
            document.getElementsByClassName('calendar')[0].classList.toggle('minimize');
            isMin(!min)
        }

        return (
            <>
                <TopBar title='Calendar' onDblClick={minimize}>
                    <div className='TabBarWrapper'>
                        <div className='TabBar'>
                            <div className='TabBarItem'>
                                <div className='TabBarInteraction' style={{ marginRight: '7px '}}>
                                    <i className='fa-regular fa-chevron-left' onClick={handlePrev}></i>
                                </div>
                                <p>{dayObj.format("MMM DD, YYYY")}</p>
                                <div className='TabBarInteraction' style={{ marginLeft: '7px '}}>
                                    <i className='fa-regular fa-chevron-right' onClick={handleNext}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='TopBarInteractionWrapper' style={{ display: 'flex' }}>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </div>
                </TopBar>
                <WindowBody>
                    <div className='Calendar'>
                        <div className='CalendarHeader'>
                            {weekDays.map(d => (
                                <div className="WeekCell">
                                    <p key={d} style={{ float: 'right' }}>{d}</p>
                                </div>
                            ))}
                        </div>
                        <div className="CalendarDate">
                            {range(weekDayOf1).map(i => (
                                <div className="CalendarDateCell">
                                    <p className='fade' key={i}>{dayObjOf1.subtract(weekDayOf1 - i, "day").date()}</p>
                                </div>
                            ))}

                            {range(daysInMonth).map(i => (
                                <div className="CalendarDateCell">
                                    <p
                                    className={
                                        i + 1 === todayObj.date() &&
                                        thisMonth === todayObj.month() &&
                                        thisYear === todayObj.year()
                                            ? " today"
                                            : ""
                                    }
                                    key={i}>{i + 1}</p>
                                </div>
                            ))}

                            {range(6 - weekDayOfLast).map(i => (
                                <div className="CalendarDateCell">
                                    <p className="fade" key={i}>{dayObjOfLast.add(i + 1, "day").date()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='CalendarWindow'>   
                <div
                    className='Window calendar'
                    key={Math.random()}
                >
                    <CalendarWindow/>
                </div> 
        </div>
    )
}
