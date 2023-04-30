import React, { useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/camera.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

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
    function close(){
        document.getElementsByClassName('camera')[0].classList.remove('active');
        document.getElementById('camera').classList.remove('clicked');
    }

    function minimize(){
        document.getElementsByClassName('camera')[0].classList.toggle('minimize');
    }

    window.onload = () => {
        var video = document.getElementById("camvideo");

        video.setAttribute("playsinline", "");
        video.setAttribute("autoplay", "");
        video.setAttribute("muted", "");

        var constraints = {
        audio: false,
        video: true
        };

        navigator.mediaDevices.getUserMedia(constraints).then((dstream) => {
        video.srcObject = dstream;
        console.log(dstream);
        });
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
                            <div className='CameraVideo'>
                                <video id='camvideo'></video>
                            </div>
                        </div>
                    </WindowBody>
                </div> 
        </div>
    )
}
