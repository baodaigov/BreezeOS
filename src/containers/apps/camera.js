import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/camera.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import Webcam from 'react-webcam';

export const CameraApp = () => {
    const toggle = () => {
        document.getElementsByClassName('CameraApp')[0].classList.add('clicked');
        setTimeout(() => {
            document.getElementsByClassName('camera')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='camera' class="CameraApp" title='Camera' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg' onClick={toggle}/>
	)
};

export const CameraStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('CameraApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('camera')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='camera' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-camera.svg' name='Camera' onClick={toggle}/>
    )
}

export default function Camera() {

    const CameraWindow = () => {
        const [webcam, setWebcam] = useState(false);
        const [interaction, disableInteraction] = useState('capturing');
        const [img, setImg] = useState(null);

        useEffect(() => {

            document.getElementById('camera').onclick = () => {
                setTimeout(() => {
                    setWebcam(!webcam);
                    console.log(webcam);
                    disableInteraction('');
                }, 1000);
            }

        }, []);

        const videoConstraints = {
            facingMode: 'user'
        }

        const webcamRef = useRef(null);
        
        const capture = useCallback(() => {
            disableInteraction('capturing');
            setTimeLeft(3);
            setTimeout(() => {
                document.getElementsByClassName('Desktop')[0].classList.add('capture');
                const imageSrc = webcamRef.current.getScreenshot();
                setImg(imageSrc);
                disableInteraction('');
                setTimeout(() => {
                    document.getElementsByClassName('Desktop')[0].classList.remove('capture');
                }, 1000);
            }, 3000)
        }, [webcamRef]);
        
        const [item, swapItem] = useState(false);

        const [timeLeft, setTimeLeft] = useState(null);
    
        useEffect(() => {
            if(timeLeft == 0) setTimeLeft(null);

            if (!timeLeft) return;

            const intervalId = setInterval(() => {
              setTimeLeft(timeLeft - 1);
            }, 1000);
        
            return () => clearInterval(intervalId);
        }, [timeLeft])

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        
        const [time, setTime] = useState(0);
        const [running, setRunning] = useState(false);
        const [recording, isRecording] = useState(false);
        
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

        const record = useCallback(() => {
            disableInteraction('capturing');
            setTimeLeft(3);
            setTimeout(() => {
                document.getElementsByClassName('CameraRecordTime')[0].classList.add('active');
                isRecording(true);
                setRunning(true)
            }, 3000)
        }, [webcamRef]);

        const stopRecord = () => {
            disableInteraction('');
            document.getElementsByClassName('CameraRecordTime')[0].classList.remove('active');
            isRecording(false);
            setRunning(false);
        };

        function close(){
            document.getElementsByClassName('camera')[0].classList.remove('active');
            document.getElementById('camera').classList.remove('clicked');
            setTimeout(() => {
                setWebcam(!webcam);
                disableInteraction('capturing');
                stopRecord();
            }, 300);
        }
    
        function minimize(){
            document.getElementsByClassName('camera')[0].classList.toggle('minimize');
        }
        
        return (
            <>
                <TopBar title='Camera' onDblClick={minimize}>
                    <TopBarInteraction action='hide'/>
                    <TopBarInteraction action='minMax' onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='Camera blackscr'>
                        <div className='CameraVideo'>
                            <div className='CameraRecordTime'>
                                <p>
                                    <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
                                    <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                                    <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                                </p>
                            </div>
                            <div className='CameraTimer'>
                                <p>{timeLeft}</p>
                            </div>
                            {webcam ? (
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    imageSmoothing={true}
                                    mirrored={true}
                                />
                            ) : ''}
                        </div>
                        <div className={`CameraInteraction ${interaction}`}>
                            <div className='CameraAct' onClick={() => swapItem(!item)}>
                                <i className={`fa-light ${item ? 'fa-camera' : 'fa-video'}`}></i>
                            </div>
                            {item ? (
                                <div className={`CameraCapture ${recording ? 'isRecording' : ''}`} onClick={recording ? stopRecord : record}>
                                    {recording ? <i className="fa-solid fa-square"></i>: <i className='fa-light fa-video'></i>}
                                </div>
                            ) : (
                                <div className='CameraCapture' onClick={capture}>
                                    <i className='fa-light fa-camera'></i>
                                </div>
                            )}
                            <div className='CameraCapturedImg'>
                                {img != null ? <img src={img} alt="screenshot"/> : ''}
                            </div>
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='CameraWindow'>
                <div
                    className='Window camera'
                    key={Math.random()}
                >
                    <CameraWindow/>
                </div> 
        </div>
    )
}
