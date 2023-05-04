import React, { useEffect, useState } from 'react';
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

    window.onload = () => {
        navigator.permissions.query({ name: "camera" }).then(res => {
            if(res.state != "granted"){
                document.getElementsByClassName('MissingPermissionCamera')[0].classList.add('active');
            }
        });
    }

    const Camera = () => {
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

        const webcamRef = React.useRef(null)
        const capture = React.useCallback(() => {
            disableInteraction('capturing');
            setTimeLeft(3);
        }, [webcamRef])

        const [timeLeft, setTimeLeft] = useState(null);
    
        const Timer = () => {
            useEffect(() => {
                if(timeLeft == 0){
                    document.getElementsByClassName('Desktop')[0].classList.add('capture');
                    disableInteraction('');
                    setTimeout(() => {
                        document.getElementsByClassName('Desktop')[0].classList.remove('capture');
                    }, 1000);
                    setTimeLeft(null);
                }
            
                // exit early when we reach 0
                if (!timeLeft) return;
            
                // save intervalId to clear the interval when the
                // component re-renders
                const intervalId = setInterval(() => {
                  setTimeLeft(timeLeft - 1);
                }, 1000);
            
                // clear interval on re-render to avoid memory leaks
                return () => clearInterval(intervalId);
                // add timeLeft as a dependency to re-rerun the effect
                // when we update it
            }, [timeLeft])
    
            return <p>{timeLeft}</p>;
        }

        return (
            <>
                <div className='CameraVideo'>
                    <div className='CameraTimer'>
                        <Timer/>
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
                    <div className='CameraCapture' onClick={capture}>
                        <i className="fa-regular fa-camera"></i>
                    </div>
                </div>
            </>
        )
    }

    function close(){
        document.getElementsByClassName('camera')[0].classList.remove('active');
        document.getElementById('camera').classList.remove('clicked');
    }

    function minimize(){
        document.getElementsByClassName('camera')[0].classList.toggle('minimize');
    }

    return (
        <div className='CameraWindow'>
                <div
                    className='Window camera'
                    key={Math.random()}
                >
                    <TopBar title='Camera' onDblClick={minimize}>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action='minMax' onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </TopBar>
                    <WindowBody>
                        <div className='Camera'>
                            <Camera/>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
