import React, { useEffect, useState, useRef } from 'react';
import './Clock.scss';
import Draggable from 'react-draggable';
import ActMenu, { ActMenuSelector } from '../menu';
import useTime from '@/hooks/useTime';
import img from '@/images/clock-pattern.svg';

const Clock = () => {
  const { fullHour, hour, fullMin, min, fullSec, sec } = useTime();
  const hourDeg = hour * 30;
  const minDeg = min * 6;
  const secDeg = sec * 6;
  const [contextMenuEnabled, setContextMenuEnabled] = useState<boolean>(false);
  const [secondsDisplayed, setSecondsDisplay] = useState<boolean>(false);
  const [style, setStyle] = useState<string>('default');

  function useOutsideMenu(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setContextMenuEnabled(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const contextMenuRef = useRef(null);
  useOutsideMenu(contextMenuRef);

  return (
    <Draggable handle=".ClockWidgetContainer">
      <div
        className={`ClockWidget ${style}`}
        onContextMenu={() => setContextMenuEnabled(true)}
      >
        <ActMenu
          style={{
            position: 'absolute',
            zIndex: '10001',
            top: '100px',
            right: '100px',
            width: '200px',
          }}
          className={contextMenuEnabled ? 'active' : ''}
          ref={contextMenuRef}
        >
          <ActMenuSelector
            onClose={() => setContextMenuEnabled(false)}
            title="Default"
            onClick={() => setStyle('default')}
            active={style === 'default'}
          />
          <ActMenuSelector
            onClose={() => setContextMenuEnabled(false)}
            title="Simple"
            onClick={() => setStyle('simple')}
            active={style === 'simple'}
          />
          <ActMenuSelector
            onClose={() => setContextMenuEnabled(false)}
            title="Display seconds"
            onClick={() => setSecondsDisplay(!secondsDisplayed)}
            active={secondsDisplayed}
          />
        </ActMenu>
        {/* <div className="CloseButtonContainer">
          <div
            className="CloseButton"
          >
            <i className="fa-regular fa-xmark" />
          </div>
        </div> */}
        <div className="ClockWidgetContainer">
          <div
            className="Hour"
            style={{
              transform: `rotateZ(${hourDeg}deg)`,
            }}
          />
          <div
            className="Min"
            style={{
              transform: `rotateZ(${minDeg}deg)`,
            }}
          />
          <div
            className={`Sec ${secondsDisplayed ? 'active' : ''}`}
            style={{
              transform: `rotateZ(${secDeg}deg)`,
            }}
          />
          <div className="HandlerContainer">
            <div className="Handler" />
          </div>
          <img className="ClockImg" src={img} />
          <div className="Time">
            <span>{fullHour}</span>
            <span className="TimeSeparator"></span>
            <span>{fullMin}</span>
            {secondsDisplayed && <span className="TimeSec">{fullSec}</span>}
          </div>
          <span className="Number twelve" />
          <span className="Number three" />
          <span className="Number six" />
          <span className="Number nine" />
        </div>
      </div>
    </Draggable>
  );
};

export default Clock;
