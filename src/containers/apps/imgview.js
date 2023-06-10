import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import './assets/imgview.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';

export default function ImgView() {
    const ImgViewWindow = () => {
        const picLocation = useSelector(state => state.imgview.location);
        const pic = useSelector(state => state.imgview.pic);
        
        function close(){
            document.getElementsByClassName('imgview')[0].classList.remove('active');
        }

        return (
            <>
                <TopBar title={`Image Viewer – ${picLocation}`}>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='ImgView'>
                        <img src={pic}/>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='ImgViewWindow'>   
                <div
                    className='Window imgview minimize'
                    key={Math.random()}
                >
                    <ImgViewWindow/>
                </div> 
        </div>
    )
}
