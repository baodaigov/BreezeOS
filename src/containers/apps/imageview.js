import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import './assets/imgview.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';

export default function ImgView() {
    const ImgViewWindow = () => {
        const pic = useSelector(state => state.imgview.pic);

        const [min, isMin] = useState(false);
        
        function close(){
            document.getElementsByClassName('imgview')[0].classList.remove('active');
        }
        
        function minimize(){
            document.getElementsByClassName('imgview')[0].classList.toggle('minimize');
            isMin(!min);
        }

        return (
            <>
                <TopBar title='Image Viewer' onDblClick={minimize}>
                    <TopBarInteraction action='hide'/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize} />
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='ImgView'>
                        <p>{pic}</p>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='ImgViewWindow'>   
                <div
                    className='Window imgview'
                    key={Math.random()}
                >
                    <ImgViewWindow/>
                </div> 
        </div>
    )
}
