import { useAppSelector } from '@/store/hooks';
import './Window.scss';
import React, { useEffect } from 'react';
import Error from '@/images/dialog-error.svg';
import Information from '@/images/dialog-information.svg';
import Question from '@/images/dialog-question.svg';
import Warning from '@/images/dialog-warning.svg';
import CriticalError from '@/sounds/Oxygen-Sys-App-Error-Critical.mp3';
import ExclamationError from '@/sounds/Oxygen-Sys-App-Error.mp3';

interface WindowBodyDefaultProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'critical' | 'exclamation' | 'question' | 'information';
  icon?: string;
  title?: string;
  content?: string;
}

export default function WindowBodyDefault({
  type,
  icon,
  title,
  content,
  children,
}: WindowBodyDefaultProps) {
  const shellTheme = useAppSelector((state) => state.shell.theme);

  useEffect(() => {
    switch (type) {
      case 'critical':
        new Audio(CriticalError).play();
        break;
      case 'exclamation':
        new Audio(ExclamationError).play();
        break;
    }
  }, [type]);

  function switchIcon() {
    switch (type) {
      case 'critical':
        return <img className="WindowBodyIcon" src={Error} />;
      case 'exclamation':
        return <img className="WindowBodyIcon" src={Warning} />;
      case 'question':
        return <img className="WindowBodyIcon" src={Question} />;
      case 'information':
        return <img className="WindowBodyIcon" src={Information} />;
      default:
        return <img className="WindowBodyIcon" src={icon} />;
    }
  }

  return (
    <div
      className={`WindowBodyDefault ${
        shellTheme === 'WhiteSur' ? 'whitesur' : ''
      }`}
    >
      <div style={{ display: 'flex' }}>
        {switchIcon()}
        <div className="WindowBodyRight">
          {title && <p className="WindowBodyTitle">{title}</p>}
          {content && (
            <p
              className="WindowBodyContent"
              style={{ marginTop: title ? '8px' : 0 }}
            >
              {content}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
