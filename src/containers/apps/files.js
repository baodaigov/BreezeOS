import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {setActive, setHide} from "../../reducers/apps/files";
import { setLocation, openPic } from '../../reducers/imgview';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/files.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import Image1 from './assets/Screenshot from 2022-09-10 20-41-45.png';
import Image2 from './assets/favicon.ico';
import Image3 from './assets/dark.png';
import Image4 from './assets/light.png';
import Image5 from './assets/logo-d.png';
import Image6 from './assets/logo-l.png';

export const FilesApp = () => {
    const isActive = useSelector(state => state.appsFiles.active);
    const isHide = useSelector(state => state.appsFiles.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);
    
    document.addEventListener('keydown', (e) => {
        if(e.ctrlKey && e.keyCode === 54){
            dispatch(setActive(true));
        }
    });

    useEffect(() => {
        if(isActive){
            document.getElementsByClassName('FilesApp')[0].classList.add('clicked');
            setTimeout(() => document.getElementsByClassName('files')[0].classList.add('active'), 500);
        } else {
            document.getElementsByClassName('FilesApp')[0].classList.remove('clicked');
            document.getElementsByClassName('files')[0].classList.remove('active');
        }
        if(isHide){
            document.getElementsByClassName('FilesApp')[0].classList.add('hide');
            document.getElementsByClassName('files')[0].classList.add('hide');
        } else {
            document.getElementsByClassName('FilesApp')[0].classList.remove('hide');
            document.getElementsByClassName('files')[0].classList.remove('hide');
        }
    }, [isActive, isHide]);
    
	return (
		<>
        <DockItem id='files' class="FilesApp" title='Files' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/file-manager.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} onClick={() => isHide ? dispatch(setHide(false)) : dispatch(setActive(true))}/>
		</>
	)
};

export const FilesStartApp = () => {
    const isHide = useSelector(state => state.appsFiles.hide);
    const dispatch = useDispatch();
    const icon = useSelector(state => state.appearance.iconTheme);
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        if(isHide){
            dispatch(setHide(false));
        } else {
            dispatch(setActive(true));
        }
    };

    return (
        <StartApp key='files' icon={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/original/file-manager.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} name='Files' onClick={toggle}/>
    )
}

export default function Files(){
    const dispatch = useDispatch();

    const FilesWindow = () => {
		const dispatch = useDispatch();
    	const [value, setValue] = useState('1');
		const [directory, setDirectory] = useState('/home/localhost');
		const [iconSize, setIconSize] = useState(70);
        const [settingsMenu, showSettingsMenu] = useState(false);
        const icon = useSelector(state => state.appearance.iconTheme);

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
	    setDirectory('Recent');
        }

        function starred(){
            setValue('a');
	    setDirectory('Starred');
        }

        function house(){
            setValue('1');
	    setDirectory('/home/localhost');
        }

        function desktop(){
            setValue('2');
	    setDirectory('/home/localhost/Desktop');
        }

        function file(){
            setValue('3');
	    setDirectory('/home/localhost/Documents');
        }

        function download(){
            setValue('4');
	    setDirectory('/home/localhost/Downloads');
        }

        function music(){
            setValue('5');
	    setDirectory('/home/localhost/Music');
        }

        function image(){
            setValue('6');
	    setDirectory('/home/localhost/Pictures');
        }

        function film(){
            setValue('7');
	    setDirectory('/home/localhost/Videos');
        }

        function trash(){
            setValue('8');
	    setDirectory('/home/localhost/Trash');
        }

        function otherLocation(){
            setValue('9');
	    setDirectory('Other Locations');
        }

		function useOutsideSettingsMenu(ref) {
		  useEffect(() => {
			/**
			 * Alert if clicked on outside of element
			 */
			function handleClickOutside(event) {
			  if (ref.current && !ref.current.contains(event.target)) {
				showSettingsMenu(false);
			  }
			}
			// Bind the event listener
			document.addEventListener("mousedown", handleClickOutside);
	
			return () => {
			  // Unbind the event listener on clean up
			  document.removeEventListener("mousedown", handleClickOutside);
			};
		  }, [ref]);
		}
	
		const settingsMenuRef = useRef(null);
		useOutsideSettingsMenu(settingsMenuRef);

        function openPicture(location, pic){
            dispatch(setLocation(location));
            dispatch(openPic(pic));
        }

        const [min, isMin] = useState(false);
    
        function close(){
            dispatch(setActive(false));
            setTimeout(() => {
            	setValue('1');
            	house();
            }, 300);
        }
    
        function minimize(){
            document.getElementsByClassName('files')[0].classList.toggle('minimize');
            isMin(!min);
        }

	function switchTab(){
		switch(directory){
			case '/':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/bin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>bin</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/boot')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>boot</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/build')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>build</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/dev')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>dev</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/etc')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>etc</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>home</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lib</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib64')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lib64</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lost+found')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lost+found</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/mnt')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>mnt</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/opt')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>opt</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/proc')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>proc</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/root')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>root</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/run')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>run</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/sbin')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sbin</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/srv')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>srv</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/sys')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sys</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/tmp')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>tmp</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>usr</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var')}>
		                                    <img className='FilesIcon ln' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>var</p>
		                                </div>
		                        </div>
				)
			case '/etc':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/etc/ld.so.conf.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>ld.so.conf.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/etc/profile.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>profile.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/etc/skel')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>skel</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch-release</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>crypttab</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>fstab</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>group</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>gshadow</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>host.conf</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>hosts</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>issue</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>ld.so.conf</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/inode-symlink.svg' width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>mtab</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>nsswitch.conf</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>passwd</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>profile</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>resolve.conf</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>securetty</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>shadows</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>shells</p>
		                                </div>
		                        </div>
				)
			case '/etc/profile.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>locale.sh</p>
		                                </div>
		                        </div>
				)
			case '/lib':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib/sysctl.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysctl.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib/systemd')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>systemd</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib/sysusers.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysusers.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib/tmpfiles.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>tmpfiles.d</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>os-release</p>
		                                </div>
		                        </div>
				)
			case '/lib/sysctl.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/lib/systemd':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib/systemd/system-environment-generators')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>system-environment- generators</p>
		                                </div>
		                        </div>
				)
			case '/lib/systemd/system-environment-generators':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch</p>
		                                </div>
		                        </div>
				)
			case '/lib/sysusers.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/lib/tmpfiles.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/lib64':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib64/sysctl.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysctl.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib64/systemd')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>systemd</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib64/sysusers.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysusers.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib64/tmpfiles.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>tmpfiles.d</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>os-release</p>
		                                </div>
		                        </div>
				)
			case '/lib64/sysctl.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/lib64/systemd':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/lib64/systemd/system-environment-generators')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>system-environment- generators</p>
		                                </div>
		                        </div>
				)
			case '/lib64/systemd/system-environment-generators':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch</p>
		                                </div>
		                        </div>
				)
			case '/lib64/sysusers.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/lib64/tmpfiles.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/srv':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/srv/ftp')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>ftp</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/srv/http')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>http</p>
		                                </div>
		                        </div>
				)
			case '/usr':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/bin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>bin</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/include')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>include</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lib</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib64')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lib64</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>local</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/sbin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sbin</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/share')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>share</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/src')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>src</p>
		                                </div>
		                        </div>
				)
			case '/usr/share':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/share/pixmaps')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        	<p className='FilesName'>pixmaps</p>
		                                </div>
		                        </div>
				)
			case '/usr/share/pixmaps':
				return (
					<div className='FilesSection2'>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/usr/share/pixmaps/logo-d.png',Image5)}>
		                    <img className='FilesIcon' src={Image5} width='auto' height={iconSize}/>
				            <p className='FilesName'>logo-d.png</p>
		                </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/usr/share/pixmaps/logo-l.png',Image6)}>
		                    <img className='FilesIcon' src={Image6} width='auto' height={iconSize}/>
				            <p className='FilesName'>logo-l.png</p>
		                </div>
		        	</div>
				)
			case '/usr/lib':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib/sysctl.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysctl.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib/systemd')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>systemd</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib/sysusers.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysusers.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib/tmpfiles.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>tmpfiles.d</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>os-release</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib/sysctl.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib/systemd':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib/systemd/system-environment-generators')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>system-environment- generators</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib/systemd/system-environment-generators':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib/sysusers.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib/tmpfiles.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib64':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib64/sysctl.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysctl.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib64/systemd')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>systemd</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib64/sysusers.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sysusers.d</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib64/tmpfiles.d')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>tmpfiles.d</p>
		                                </div>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>os-release</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib64/sysctl.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib64/systemd':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/lib64/systemd/system-environment-generators')}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>system-environment- generators</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib64/systemd/system-environment-generators':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>10-arch</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib64/sysusers.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/usr/lib64/tmpfiles.d':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
				                        <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>arch.conf</p>
		                                </div>
		                        </div>
				)
			case '/usr/local':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/bin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>bin</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/etc')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>etc</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/games')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>games</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/include')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>include</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/lib')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lib</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/man')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>man</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/sbin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>sbin</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/share')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>share</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/src')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>src</p>
		                                </div>
		                        </div>
				)
			case '/usr/local/share':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/usr/local/share/man')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>man</p>
		                                </div>
		                        </div>
				)
			case '/var':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/cache')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>cache</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/empty')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>empty</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/games')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>games</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/lib')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lib</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/local')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>local</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/log')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>log</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/mail')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>mail</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/opt')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>opt</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/run')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>run</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/spool')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>spool</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/tmp')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>tmp</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/inode-symlink.svg' width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>lock</p>
		                                </div>
		                        </div>
				)
			case '/var/lib':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/lib/misc')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>misc</p>
		                                </div>
		                        </div>
				)
			case '/var/log':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/log/old')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>old</p>
		                                </div>
		                        </div>
				)
			case '/var/spool':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/var/spool/mail')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>mail</p>
		                                </div>
		                        </div>
				)
			case '/home':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={house}>
		                                    	<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>localhost</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={desktop}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/user-desktop.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-user-desktop.svg'} width={iconSize} height={iconSize}/>
				                            <p className='FilesName'>Desktop</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={file}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-documents.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-documents.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Documents</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={download}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-download.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-download.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Downloads</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={music}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-music.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-music.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Music</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={image}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-images.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-pictures.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Pictures</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Public')}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-public.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-publicshare.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Public</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Templates')}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-templates.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-templates.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Templates</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={film}>
                                            <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder-videos.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder-video.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Videos</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Documents':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Untitled-1.txt</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-x-cpp.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-cpp.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>hello.cpp</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Downloads':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Downloads/code-stable-x64-1675893708')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>code-stable-x64-1675893708</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Downloads/dotfiles-public')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>dotfiles-public</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Downloads/Palatino')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Palatino</p>
		                                </div>
                                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Downloads/cat-cute.jpg','https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-cute.jpg?raw=true')}>
		                                    <img className='FilesIcon' src='https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-cute.jpg?raw=true' width='auto' height={iconSize}/>
		                                    <p className='FilesName'>cat-cute.jpg</p>
		                                </div>
                                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Downloads/cat-blue-eyes.jpg','https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-blue-eyes.jpg?raw=true')}>
		                                    <img className='FilesIcon' src='https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-blue-eyes.jpg?raw=true' width='auto' height={iconSize}/>
		                                    <p className='FilesName'>cat-blue-eyes.jpg</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/x-office-presentation.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/x-office-presentation.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>Simple Green.pptx</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => window.location.href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/video-x-generic.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/video-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>double-click this.mp4</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Downloads/code-stable-x64-1675893708':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Downloads/code-stable-x64-1675893708/VSCode-linux-x64')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>VSCode-linux-x64</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Pictures':
				return (
					<div className='FilesSection2'>
		                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Pictures/Screenshots')}>
		                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                    <p className='FilesName'>Screenshots</p>
		                </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/cat-ceiling.jpg','https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-ceiling.jpg?raw=true')}>
		                    <img className='FilesIcon' src='https://github.com/feross/TheAnnoyingSite.com/blob/master/static/cat-ceiling.jpg?raw=true' width='auto' height={iconSize}/>
		                    <p className='FilesName'>cat-ceiling.jpg</p>
		                </div>
		                <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/dark.png',Image3)}>
		                    <img className='FilesIcon' src={Image3} width='auto' height={iconSize}/>
				            <p className='FilesName'>dark.png</p>
		                </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/light.png',Image4)}>
		                    <img className='FilesIcon' src={Image4} width='auto' height={iconSize}/>
				            <p className='FilesName'>light.png</p>
		                </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/picture.png','https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot.png?raw=true')}>
				            <img className='FilesIcon' src='https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot.png?raw=true' width='auto' height={iconSize}/>
				            <p className='FilesName'>picture.png</p>
				        </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/picture-2.png','https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot2.png?raw=true')}>
				            <img className='FilesIcon' src='https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot2.png?raw=true' width='auto' height={iconSize}/>
				            <p className='FilesName'>picture-2.png</p>
				        </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/picture-3.png','https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot3.png?raw=true')}>
				            <img className='FilesIcon' src='https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot3.png?raw=true' width='auto' height={iconSize}/>
				            <p className='FilesName'>picture-3.png</p>
				        </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/picture-4.png','https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot4.png?raw=true')}>
				            <img className='FilesIcon' src='https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot4.png?raw=true' width='auto' height={iconSize}/>
				            <p className='FilesName'>picture-4.png</p>
				        </div>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/picture-5.png','https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot5.png?raw=true')}>
				            <img className='FilesIcon' src='https://github.com/baodaigov/BreezeOS/blob/master/public/gallery/screenshot5.png?raw=true' width='auto' height={iconSize}/>
				            <p className='FilesName'>picture-5.png</p>
				        </div>
		            </div>
				)
			case '/home/localhost/Pictures/Screenshots':
				return (
					<div className='FilesSection2'>
                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Pictures/Screenshots/Screenshot from 2022-09-10 20-41-45.png',Image1)}>
		                    <img className='FilesIcon' src={Image1} width='auto' height={iconSize}/>
		                    <p className='FilesName'>Screenshot from 2022-09-10 20-41-45.png</p>
		                </div>
		            </div>
				)
			case '/home/localhost/Trash':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>thanhhafmcvn</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>thanhhafmcvn. github.io</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>.git</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>.gitignore</p>
		                                </div>
                                        <div className='FilesItem' onDoubleClick={() => openPicture('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/favicon.ico',Image2)}>
		                                    <img className='FilesIcon' src={Image2} width='auto' height={iconSize}/>
		                                    <p className='FilesName'>favicon.ico</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/text-html.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-html.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>index.html</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/branches')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>branches</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/hooks')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>hooks</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/info')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>info</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>logs</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/objects')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>objects</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>refs</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>config</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>description</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>HEAD</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-octet-stream.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-octet-stream.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>index</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>packed-refs</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/hooks':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>applypatch-msg.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>commit-msg.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-perl.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-perl.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>fsmonitor-watchman.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>post-update.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pre-applypatch.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pre-commit.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pre-merge-commit.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>prepare-commit-msg.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pre-push.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pre-rebase.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pre-receive.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>push-to-checkout.sample</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-shellscript.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-shellscript.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>update.sample</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/info':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>exclude</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>refs</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>HEAD</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs/heads')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>heads</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs/remotes')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>remotes</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs/heads':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>main</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs/remotes':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs/remotes/origin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>origin</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/logs/refs/remotes/origin':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>HEAD</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/objects':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/objects/info')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>info</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/objects/pack')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pack</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/objects/pack':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-octet-stream.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-octet-stream.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pack-d96a69752d638... 2b4c.idx</p>
		                                </div>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/package-x-generic.svg' width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>pack-d96a69752d638... b4c.pack</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/heads')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>heads</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/remotes')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>remotes</p>
		                                </div>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/tags')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>tags</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/heads':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>main</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/remotes':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/remotes/origin')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>origin</p>
		                                </div>
		                        </div>
				)
			case '/home/localhost/Trash/thanhhafmcvn/thanhhafmcvn.github.io/.git/refs/remotes/origin':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-text-template.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/text-x-generic.svg'} width={iconSize} height={iconSize}/>
		                                    <p className='FilesName'>HEAD</p>
		                                </div>
		                        </div>
				)
			case 'Other Locations':
				return (
					<div className='OtherLocations'>
						<div className='HeaderBar'>
							<p className='font-bold'>On this computer</p>
							<p className='font-bold'>Partitions</p>
						</div>
						<div>
							<div className='OtherLocationsItem' onClick={() => setDirectory('/')}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/drive-harddisk.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg'} width={30} height={30} style={{ marginRight: '18px' }}/>
									<p>BreezeOS</p>
								</div>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<p style={{margin:'0 20px'}}>80.3 GB / 128 GB left</p>
									<p style={{margin:'0 20px'}}>/</p>
								</div>
							</div>
							<div className='OtherLocationsItem' onClick={() => setDirectory('500MB Partition')}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/drive-harddisk.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/devices/drive-harddisk.svg'} width={30} height={30} style={{ marginRight: '18px' }}/>
									<p>500MB Partition</p>
								</div>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<p style={{margin:'0 20px'}}>/dev/sda1</p>
								</div>
							</div>
						</div>
						<div className='HeaderBar'>
							<p className='font-bold'>Networks</p>
						</div>
						<div>
							<div className='OtherLocationsItem'>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/devices/scalable/network_fs.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/network-workgroup.svg'} width={30} height={30} style={{ marginRight: '18px' }}/>
									<p>Windows Network</p>
								</div>
							</div>
						</div>
					</div>
				)
			case '500MB Partition':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('500MB Partition/EFI')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>EFI</p>
		                                </div>
		                        </div>
				)
			case '500MB Partition/EFI':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem' onDoubleClick={() => setDirectory('500MB Partition/EFI/GRUB')}>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/places/scalable/folder.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/places/default-folder.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>GRUB</p>
		                                </div>
		                        </div>
				)
			case '500MB Partition/EFI/GRUB':
				return (
					<div className='FilesSection2'>
		                                <div className='FilesItem'>
		                                    <img className='FilesIcon' src={icon === 'WhiteSur-icon-theme' ? 'https://raw.githubusercontent.com/vinceliuice/WhiteSur-icon-theme/54ffa0a42474d3f0f866a581e061a27e65c6b7d7/src/mimes/scalable/application-x-ms-dos-executable.svg' : 'https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/mimetypes/application-x-ms-dos-executable.svg'} width={iconSize} height={iconSize}/>
				                        <p className='FilesName'>grubx64.efi</p>
		                                </div>
		                        </div>
				)
			default:
				return (
					<div className='NoFiles'>
						<p className='font-bold'>Empty Folder</p>
					</div>
				)
        }
    }



        return (
            <>
				<ActMenu style={{ zIndex: '1', top: '30px', right: '100px' }} className={settingsMenu ? 'active' : ''} ref={settingsMenuRef}>
					<div className='iconSize'>
					<ActMenuSelector title='Icon size'>
						<div style={{ marginLeft: '15px', display: 'flex' }}>
							<i className={`fa-regular fa-plus ActMenuInteraction ${iconSize == 145 ? 'disabled' : ''}`} onClick={() => setIconSize(iconSize + 25)}></i>
							<i className={`fa-regular fa-minus ActMenuInteraction ${iconSize == 20 ? 'disabled' : ''}`} onClick={() => setIconSize(iconSize - 25)}></i>
						</div>
					</ActMenuSelector>
					</div>
				</ActMenu>
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
                                            <i className={`fa-regular ${directory == 'Recent' ? 'fa-clock-rotate-left' : directory == 'Starred' ? 'fa-star' : directory == '/home/localhost' ? 'fa-house' : directory == '500MB Partition' ? 'fa-hard-drive' : directory == 'Other Locations' ? 'fa-plus' : 'fa-folder'}`} style={{ marginRight: '5px' }}></i>
                                            <p>{directory}</p>
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
                                <div className='TabBarInteraction' onClick={() => showSettingsMenu(!settingsMenu)}>
                                    <i className="fa-regular fa-bars"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='TopBarInteractionWrapper' style={{ display: 'flex' }}>
                        <TopBarInteraction action='hide' onHide={() => dispatch(setHide(true))}/>
                        <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
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
								<div style={{position:'relative',width:'100%',height:'100%'}}>
									<div style={{position:'absolute',width:'100%',height:'100%',overflowY:'auto'}}>
		                				{switchTab()}
									</div>
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
