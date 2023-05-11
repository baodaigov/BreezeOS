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
        const [tabLayout, setTabLayout] = useState(true);
        const [value, setValue] = useState('1');
        const [tab, setTab] = useState('explorer');
        const [search, onSearch] = useState(false);

        function explorerTab(){
            setValue('1');
            setTab('explorer')
        }

        function installedTab(){
            setValue('2');
            setTab('installed')
        }

        function updatesTab(){
            setValue('3');
            setTab('updates')
        }

        function close(){
            document.getElementsByClassName('softwarestore')[0].classList.remove('active');
            document.getElementById('softwarestore').classList.remove('clicked');
            setTimeout(() => {
                explorerTab();
            }, 300);
        }

        function minimize(){
            document.getElementsByClassName('softwarestore')[0].classList.toggle('minimize');
            isMin(!min)
        }

        function switchTab(){
            switch(tab) {
                case 'explorer':
                    return (
                        <div className='explorer'>
                            <p>Nothing in this section.</p>
                        </div>
                    )
                case 'installed':
                    return (
                        <div className='installed'>
                            <p>Nothing in this section.</p>
                        </div>
                    )
                case 'updates':
                    return (
                        <div className='updates'>
                            <i className='fa-solid fa-circle-check' style={{ fontSize: '80px' }}></i>
                            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                <h1>Up to Date</h1>
                                <p className='font-normal'>Last checked: Just now</p>
                            </div>
                        </div>
                    )
            }
        }

        return (
            <>
                <TopBar title='Software Store' onDblClick={minimize}>
                    <TopBarInteraction action='hide'/>
                    <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                    <TopBarInteraction action='close' onClose={close}/>
                </TopBar>
                <WindowBody>
                    <div className='SoftwareStore'>
                        <i class="fa-light fa-table-layout SoftwareTableLayout" onClick={() => setTabLayout(!tabLayout)}></i>
                        <div className={`NavPanel ${tabLayout ? '' : 'inactive'}`}>
                            <div className='Category'>
                                <h2 className='CategoryTitle'>Categories</h2>
                                <div className='Categories'>
                                    <div className='CategoryItem red'>
                                        <i class="fa-regular fa-music fa-sm" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Audio & Video</p>
                                    </div>
                                    <div className='CategoryItem green'>
                                        <i class="fa-regular fa-message fa-sm" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Communication & News</p>
                                    </div>
                                    <div className='CategoryItem yellow'>
                                        <i class="fa-regular fa-pen-to-square fa-sm" style={{ marginRight: '7px' }}></i>
                                        <p className='font-bold'>Productivity</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='SoftwareContainer'>
                            <div className='SoftwareTab'>
                                {search ? (
                                    <div className='SoftwareNav'>
                                        <input className='SoftwareSearchbar' id='softwaresearch'spellCheck={false}/>
                                        <i className='fa-regular fa-xmark CloseSearchbar' onClick={() => onSearch(!search)}></i>
                                    </div>
                                ) : (
                                    <div className='SoftwareNav' value={value}>
                                        <div className='SoftwareNavItem explorer' onClick={explorerTab}>
                                            <i className="fa-regular fa-burst" style={{ marginRight: '7px' }}></i>
                                            <p className='font-bold'>Explorer</p>
                                        </div>
                                        <div className='SoftwareNavItem installed' onClick={installedTab}>
                                            <i className="fa-regular fa-circle-check" style={{ marginRight: '7px' }}></i>
                                            <p className='font-bold'>Installed</p>
                                        </div>
                                        <div className='SoftwareNavItem updates' onClick={updatesTab}>
                                            <i className="fa-regular fa-rotate" style={{ marginRight: '7px' }}></i>
                                            <p className='font-bold'>Updates</p>
                                        </div>
                                    </div>
                                )}
                                <i className="fa-regular fa-magnifying-glass SoftwareSearch" onClick={() => onSearch(!search)}></i>
                            </div>
                            <div className='Software'>
                                {switchTab()}
                            </div>
                        </div>
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
