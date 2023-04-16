import React, { useState, useEffect } from 'react';
import { useBattery } from 'react-use';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';

const useAudio = () => {
  const [audio] = useState(new Audio('../../sounds/Oxygen-Sys-App-Error.mp3'));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default function BatteryLow() {

  const batteryState = useBattery();

  let batteryPercent = Math.round(batteryState.level * 100);

  function close(){
    document.getElementsByClassName('BatteryLow')[0].classList.remove('active');
  }

    return (
        <div>
            <Draggable>
                <div
                    className={`Window BatteryLow ${batteryPercent <= 5 ? 'active' : ''}`}
                    onLoad={useAudio}
                    key={Math.random()}
                >
                    <TopBar type='closeOnly'/>
                    <WindowBodyDefault type='critical' title={`Battery critically low: ${batteryPercent}%`} content='The battery is below the critical level and needs to charge right now.'>
                      <WindowBodyButton>
                        <button className='Button' key={Math.random()} onClick={close}>OK</button>
                      </WindowBodyButton>
                    </WindowBodyDefault>
                </div>
            </Draggable>
        </div>
    )
}
