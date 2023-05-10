import React, { useEffect, useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/softwarestore.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const SoftwareStoreApp = () => {

    const toggle = () => {
        document.getElementsByClassName('SoftwareStoreApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('softwarestore')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='softwarestore' class="SoftwareStoreApp" title='Software Store' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/software-store.svg' onClick={toggle}/>
	)
};

export const SoftwareStoreStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('SoftwareStoreApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('softwarestore')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='softwarestore' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/software-store.svg' name='Software Store' onClick={toggle}/>
    )
}

export default function SoftwareStore() {
    const SoftwareStoreWindow = () => {
        const [min, isMin] = useState(false);

        function close(){
            document.getElementsByClassName('softwarestore')[0].classList.remove('active');
            document.getElementById('softwarestore').classList.remove('clicked');
        }

        function minimize(){
            document.getElementsByClassName('softwarestore')[0].classList.toggle('minimize');
            isMin(!min)
        }

        return (
            <>
                <TopBar title='Software Store' onDblClick={minimize}>
                    <div className='TabBarWrapper'>
                        <div className='TabBar' style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                            <div className='TabBarItem'>
                                <div className='TabBarInteraction'>
                                    <i className="fa-regular fa-bars"></i>
                                </div>
                                <div className='TabBarInteraction' style={{ marginLeft: '10px' }}>
                                    <i className="fa-regular fa-magnifying-glass"></i>
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
                    <div className='SoftwareStore'>
                        <p>aaa</p>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='SoftwareStoreWindow'>   
                <div
                    className='Window softwarestore'
                    key={Math.random()}
                >
                    <SoftwareStoreWindow/>
                </div> 
        </div>
    )
}
