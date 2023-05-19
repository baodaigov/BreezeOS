import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/camera.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import Webcam from 'react-webcam';
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";

export const CameraApp = () => {
    const toggle = () => {
        document.getElementsByClassName('CameraApp')[0].classList.add('clicked');
        setTimeout(() => {
            document.getElementsByClassName('camera')[0].classList.add('active');
        }, 500);
    };
    
    useEffect(() => {
	    document.addEventListener('keydown', (e) => {
	    	if(e.ctrlKey && e.keyCode === 53){
	    		toggle();
	    	}
	    })
    }, []);
    
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
        const [audio, setAudio] = useState(false);
        var countdownSound = new Audio('https://raw.githubusercontent.com/baodaigov/BreezeOS/master/src/sounds/mixkit-clock-countdown-bleeps-916_Bq9La32i.wav');
        var cameraShutter = new Audio('https://raw.githubusercontent.com/baodaigov/BreezeOS/master/src/sounds/camera_shutter.mp3');

        useEffect(() => {

            document.getElementById('camera').onclick = () => {
                setTimeout(() => {
                    setWebcam(!webcam); 
                    disableInteraction('');
                }, 1000);
            }

        }, []);

        const videoConstraints = {
            facingMode: 'user'
        }
        
        const [item, swapItem] = useState(false);

        const [timeLeft, setTimeLeft] = useState(null);
    
        useEffect(() => {
            if(audio){
                countdownSound.play();

                if(timeLeft < 1) {
                    setTimeLeft(null);
                    countdownSound.pause();
                }
    
                if (!timeLeft) return;
    
                const intervalId = setInterval(() => {
                    countdownSound.play();
                    setTimeLeft(timeLeft - 1);
                }, 1000);
            
                return () => clearInterval(intervalId);
            } else {
                if(timeLeft < 1) setTimeLeft(null);
    
                if (!timeLeft) return;
    
                const intervalId = setInterval(() => {
                    setTimeLeft(timeLeft - 1);
                }, 1000);
            
                return () => clearInterval(intervalId);
            }
        }, [timeLeft, audio])

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        
        const [time, setTime] = useState(0);
        const [running, setRunning] = useState(false);
        const [settingsMenu, showSettingsMenu] = useState(false);
        const [countdown, setCountdown] = useState(false);
        const webcamRef = useRef(null);

        const capture = useCallback(() => {
            if(countdown){
                if(audio){
                    disableInteraction('capturing');
                    setTimeLeft(3);
                    setTimeout(() => {
                        document.getElementsByClassName('Desktop')[0].classList.add('capture');
                        cameraShutter.play();
                        const imageSrc = webcamRef.current.getScreenshot();
                        setImg(imageSrc);
                        disableInteraction('');
                        setTimeout(() => {
                            document.getElementsByClassName('Desktop')[0].classList.remove('capture');
                        }, 1000);
                    }, 3000);
                } else {
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
                    }, 3000);
                }
            } else if(audio){
                document.getElementsByClassName('Desktop')[0].classList.add('capture');
                cameraShutter.play();
                setTimeout(() => {
                    document.getElementsByClassName('Desktop')[0].classList.remove('capture');
                }, 1000);
                const imageSrc = webcamRef.current.getScreenshot();
                setImg(imageSrc);
            } else {
                document.getElementsByClassName('Desktop')[0].classList.add('capture');
                setTimeout(() => {
                    document.getElementsByClassName('Desktop')[0].classList.remove('capture');
                }, 1000);
                const imageSrc = webcamRef.current.getScreenshot();
                setImg(imageSrc);
            }
        }, [webcamRef, countdown, audio]);
        
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

        const [recording, isRecording] = useState(false);
        const mediaRecorderRef = useRef(null);
        const [capturing, setCapturing] = useState(false);
        const [recordedChunks, setRecordedChunks] = useState([]);

        const handleDataAvailable = useCallback(
            ({ data }) => {
                if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
                }
            },
            [setRecordedChunks]
        );
      
        const record = useCallback(() => {
            if(countdown){
                disableInteraction('capturing');
                setTimeLeft(3);
                setTimeout(() => {
                    // setCapturing(true);
                    // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                    //     mimeType: "video/webm",
                    // });
                    // mediaRecorderRef.current.addEventListener(
                    //     "dataavailable",
                    //     handleDataAvailable
                    // );
                    // mediaRecorderRef.current.start();
                    document.getElementsByClassName('CameraRecordTime')[0].classList.add('active');
                    isRecording(true);
                    setRunning(true)
                }, 3000);
            } else {
                disableInteraction('capturing');
                // setCapturing(true);
                // mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                //     mimeType: "video/webm",
                // });
                // mediaRecorderRef.current.addEventListener(
                //     "dataavailable",
                //     handleDataAvailable
                // );
                // mediaRecorderRef.current.start();
                document.getElementsByClassName('CameraRecordTime')[0].classList.add('active');
                isRecording(true);
                setRunning(true)
            }
        }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable, countdown]);
      
        const stopRecord = useCallback(() => {
            // mediaRecorderRef.current.stop();
            // setCapturing(false);
            disableInteraction('');
            document.getElementsByClassName('CameraRecordTime')[0].classList.remove('active');
            isRecording(false);
            setRunning(false);
        }, [mediaRecorderRef, setCapturing]);

        const [viewMedia, setViewMedia] = useState(false);

        function displayCountdown(){
            showSettingsMenu(!settingsMenu);
            setCountdown(!countdown);
        }

        function toggleSounds(){
            showSettingsMenu(!settingsMenu);
            setAudio(!audio);
        }

        const [msgboxDelete, displayMsgboxDelete] = useState(false);

        function closeMsgBoxDelete(){
            displayMsgboxDelete(false);
        }

        function deleteImage(){
            displayMsgboxDelete(false);
            setImg(null);
        }

        const [min, isMin] = useState(false);

        function close(){
            document.getElementsByClassName('camera')[0].classList.remove('active');
            document.getElementById('camera').classList.remove('clicked');
            setTimeout(() => {
                setWebcam(!webcam);
                disableInteraction('capturing');
                document.getElementsByClassName('CameraRecordTime')[0].classList.remove('active');
                isRecording(false);
                setRunning(false);
                showSettingsMenu(false);
                setViewMedia(false);
            }, 300);
        }

        function minimize(){
            document.getElementsByClassName('camera')[0].classList.toggle('minimize');
            isMin(!min);
        }
        
        return (
            <>
                <div className={`PermanentlyDeleteMedia ${msgboxDelete ? 'active' : ''}`}>
                    <div className='WindowTopBar'>
                        <p className='WindowTopBarTitle'>Delete this image?</p>
                        <div class="WindowTopBarInteractionContainer">
                            <div class="WindowTopBarInteraction close" onClick={closeMsgBoxDelete}>
                                <i class="fa-solid fa-xmark fa-lg"></i>
                            </div>
                        </div>
                    </div>
                    <div class="WindowBodyDefault">
                        <p class="WindowBodyContent">This action is irreversible!</p>
                        <div class="WindowBodyButton">
                            <button class="Button" onClick={closeMsgBoxDelete}>No</button>
                            <button class="Button" onClick={deleteImage}>Yes</button>
                        </div>
                    </div>
                </div>
                    <ActMenu style={{ zIndex: '1', top: '30px', right: '80px' }} className={settingsMenu ? 'active' : ''}>
                        {countdown ? <ActMenuSelector title='Camera countdown' active onClick={displayCountdown}></ActMenuSelector> : <ActMenuSelector title='Camera countdown' onClick={displayCountdown}></ActMenuSelector>}
                        {audio ? <ActMenuSelector title='Enable sounds' active onClick={toggleSounds}></ActMenuSelector> : <ActMenuSelector title='Enable sounds' onClick={toggleSounds}></ActMenuSelector>}
                    </ActMenu>
                <TopBar title='Camera' onDblClick={minimize}>
                    <div className='TabBarWrapper' style={{ width: '100%' }}>
                        <div className='TabBar' style={{ display: 'block' }}>
                            <div className='TabBarItem' style={{ float: 'right' }}>
                                <div className='TabBarInteraction'>
                                    <i className="fa-regular fa-gear" onClick={() => showSettingsMenu(!settingsMenu)}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <TopBarInteraction action='hide'/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className={`Camera ${viewMedia ? 'blankscr' : ''}`}>
                        {viewMedia ? (
                            <div className='CameraViewMedia'>
                                {img != null ? (
                                    <>
                                        <div className='CameraMediaImg'>
                                            <img src={img} alt="screenshot"/>
                                        </div>
                                    </>
                                ) : (
                                    <div className='NoMedia'>
                                        <p className='NoMedia'>Nothing to show</p>
                                    </div>
                                )}
                                <div className='CameraViewInteraction'>
                                    <div className='GoBackBtn' onClick={() => setViewMedia(!viewMedia)}>
                                        <i class="fa-regular fa-arrow-left"></i>
                                    </div>
                                    {img != null ? (
                                        <div style={{ display: 'flex' }}>
                                            <div className='CameraButton'>
                                                <p>Save image</p>
                                            </div>
                                            <div className='CameraButton' onClick={() => displayMsgboxDelete(true)} onDoubleClick={deleteImage}>
                                                <p>Delete</p>
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                            </div>
                        ) : ''}
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
                            ) : (
                                <div className='WebcamDisabled'>
                                    <i className="fa-regular fa-camera-slash disableWebcam"></i>
                                </div>
                            )}
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
                                <div className='CameraCapturedImg' onClick={() => setViewMedia(!viewMedia)}>
                                    {img != null ? <img src={img} alt="screenshot"/> : ''}
                                </div>
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
