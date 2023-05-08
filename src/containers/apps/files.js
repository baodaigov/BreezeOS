import React, { useState, useEffect } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/files.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const FilesApp = () => {

    const toggle = () => {
        document.getElementsByClassName('FilesApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('files')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='files' class="FilesApp" title='Files' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg' onClick={toggle}/>
	)
};

export const FilesStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('FilesApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('files')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='files' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg' name='Files' onClick={toggle}/>
    )
}

export default function Files() {

    const FilesWindow = () => {
        const [value, setValue] = useState('1');

        const Dropdown = [
            {
                icons: 'clock-rotate-left',
                title: 'Recent',
                clickEvent: recent
            },
            {
                icons: 'star',
                title: 'Starred',
                clickEvent: starred
            },
            {
                icons: 'house',
                title: 'Home',
                clickEvent: house
            },
            {
                icons: 'desktop',
                title: 'Desktop',
                clickEvent: desktop
            },
            {
                icons: 'file',
                title: 'Documents',
                clickEvent: file
            },
            {
                icons: 'download',
                title: 'Downloads',
                clickEvent: download
            },
            {
                icons: 'music',
                title: 'Music',
                clickEvent: music
            },
            {
                icons: 'image',
                title: 'Pictures',
                clickEvent: image
            },
            {
                icons: 'film',
                title: 'Videos',
                clickEvent: film
            },
            {
                icons: 'trash',
                title: 'Trash',
                clickEvent: trash
            },
        ]

        function recent(){
            setValue('b');
        }

        function starred(){
            setValue('a');
        }

        function house(){
            setValue('1');
        }

        function desktop(){
            setValue('2');
        }

        function file(){
            setValue('3');
        }

        function download(){
            setValue('4');
        }

        function music(){
            setValue('5');
        }

        function image(){
            setValue('6');
        }

        function film(){
            setValue('7');
        }

        function trash(){
            setValue('8');
        }

        function otherLocation(){
            setValue('9');
        }

        const FilesItem = [
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-user-desktop.svg',
                name: 'Desktop'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-download.svg',
                name: 'Downloads'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-documents.svg',
                name: 'Documents'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-music.svg',
                name: 'Music'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-pictures.svg',
                name: 'Pictures'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-publicshare.svg',
                name: 'Public'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-templates.svg',
                name: 'Templates'
            },
            {
                icons: 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-video.svg',
                name: 'Videos'
            },
        ]
    
        function close(){
            document.getElementsByClassName('files')[0].classList.remove('active');
            document.getElementById('files').classList.remove('clicked');
        }
    
        function minimize(){
            document.getElementsByClassName('files')[0].classList.toggle('minimize');
        }

        return (
            <>
                <TopBar title='Files' onDblClick={minimize}>
                    <div className='TabBarWrapper' style={{ width: '100%' }}>
                        <div className='TabBar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='TabBarItem'>
                                <div className='TabBarInteraction'>
                                    <i className="fa-regular fa-chevron-left"></i>
                                    <i className="fa-regular fa-chevron-right"></i>
                                </div>
                            </div>
                            <div style={{ display: 'flex' }}>
                                    <div className='TabBarItem TabBarFileSystem'>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <i className="fa-regular fa-house" style={{ marginRight: '5px' }}></i>
                                            <p>/home</p>
                                        </div>
                                        <div className='TabBarInteraction'>
                                            <i className="fa-regular fa-ellipsis-vertical"></i>
                                        </div>
                                    </div>
                                    <div className='TabBarItem'>
                                        <div className='TabBarInteraction'>
                                            <i className="fa-regular fa-magnifying-glass"></i>
                                        </div>
                                    </div>
                            </div>
                            <div className='TabBarItem' style={{ margin: '0' }}>
                                <div className='TabBarInteraction' style={{ marginRight: '20px' }}>
                                    <i className="fa-regular fa-grid-2"></i>
                                    <div className='TabSeparator'></div>
                                    <i className="fa-regular fa-chevron-down" style={{ marginLeft: '3px' }}></i>
                                </div>
                                <div className='TabBarInteraction'>
                                    <i className="fa-regular fa-bars"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='TopBarInteractionWrapper' style={{ display: 'flex' }}>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action='minMax' onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </div>
                </TopBar>
                <WindowBody>
                    <div className='Files'>
                        <div className='FilesSection'>
                            <div className='NavPanel' value={value}>
                                <div>
                                    {Dropdown.map(i => 
                                        <div className={`DropdownMenu ${i.icons}`} onMouseDown={i.clickEvent}>
                                            <i className={`fa-regular fa-${i.icons}`}></i>
                                            <p className='DropdownTitle'>{i.title}</p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <div className='DropdownMenu otherLocation' onMouseDown={otherLocation}>
                                        <i className='fa-regular fa-plus'></i>
                                        <p className='DropdownTitle'>Other Locations</p>
                                    </div>
                                </div>
                            </div>
                            <div className='FilesContainer'>
                                <div className='FilesSection2'>
                                    {FilesItem.map(i => 
                                        <div className='FilesItem'>
                                            <img className='FilesIcon' src={i.icons} width={80} height={80}/>
                                            <p className='FilesName'>{i.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='FilesWindow'>   
                <div
                    className='Window files'
                    key={Math.random()}
                >
                    <FilesWindow/>
                </div>
        </div>
    )
}