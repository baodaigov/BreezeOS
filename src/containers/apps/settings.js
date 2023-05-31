import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAirplaneModeOff, toggleAirplaneModeOn, toggleLightMode, toggleDarkMode, toggleWifi, toggleBluetooth, setDeviceName } from '../../reducers/settings';
import wallpaper, { changeWallpaper } from '../../reducers/wallpaper';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/settings.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import Image1 from './assets/dark.png';
import Image2 from './assets/light.png';
import LogoD from './assets/logo-d.png';
import LogoL from './assets/logo-l.png';
import W1 from '../../components/Windows-11-4k-Wallpaper-scaled.jpg';
import W2 from '../../components/52697.jpg';
import W3 from '../../components/52496.jpg';
import W4 from '../../components/52791.jpg';
import W5 from '../../components/52532.jpg';
import W6 from '../../components/52544.jpg';

export const SettingsApp = () => {
    const toggle = () => {
        document.getElementsByClassName('SettingsApp')[0].classList.add('clicked');
        setTimeout(() => document.getElementsByClassName('settings')[0].classList.add('active'), 500);
    };
    
    useEffect(() => {
	    document.addEventListener('keydown', (e) => {
	    	if(e.ctrlKey && e.keyCode === 51){
	    		toggle();
	    	}
	    })
    }, []);
    
	return (
		<>
			<DockItem id='settings' class="SettingsApp" title='Settings' icon='https:\/\/raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/applications-system.svg' onClick={toggle}/>
		</>
	)
};

export const SettingsStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('SettingsApp')[0].classList.add('clicked');
        setTimeout(() => document.getElementsByClassName('settings')[0].classList.add('active'), 500);
    };

    return (
        <StartApp key='settings' icon='https:\/\/raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/applications-system.svg' name='Settings' onClick={toggle}/>
    )
}

export default function Settings(){
    const SettingsWindow = () => {
        const settingsReducer = useSelector(state => state.settings);
        const [settings, setSettings] = useState('Wi-Fi');
        const [value, setValue] = useState('1');
        const [wallpaperValue, setValueWallpaper] = useState('1');
        const dispatch = useDispatch();

        function wifi(){
            setValue('1');
	        setSettings('Wi-Fi');
        }
        
        function bluetooth(){
            setValue('2');
	    setSettings('Bluetooth');
        }
        
        function network(){
            setValue('3');
	    setSettings('Network');
        }
        
        function appearance(){
            setValue('4');
	    setSettings('Appearance');
        }
        
        function notifications(){
            setValue('5');
	    setSettings('Notifications');
        }
        
        function onlineAccounts(){
            setValue('6');
	    setSettings('Online Accounts');
        }
        
        function updates(){
            setValue('7');
	    setSettings('Updates');
        }
        
        function search(){
            setValue('8');
	    setSettings('Search');
        }
        
        function battery(){
            setValue('9');
	    setSettings('Battery');
        }
        
        function apps(){
            setValue('10');
	    setSettings('Apps');
        }
        
        function privacy(){
            setValue('11');
	    setSettings('Privacy');
        }
        
        function security(){
            setValue('12');
	    setSettings('Security');
        }
        
        function share(){
            setValue('13');
	    setSettings('Share');
        }
        
        function sound(){
            setValue('14');
	    setSettings('Sound');
        }
        
        function displays(){
            setValue('15');
	    setSettings('Displays');
        }
        
        function mouseTouchpad(){
            setValue('16');
	    setSettings('Mouse & Touchpad');
        }
        
        function keyboard(){
            setValue('17');
	    setSettings('Keyboard');
        }
        
        function printer(){
            setValue('18');
	    setSettings('Printer');
        }
        
        function regionLanguage(){
            setValue('19');
	    setSettings('Region & Language');
        }
        
        function accessibility(){
            setValue('20');
	    setSettings('Accessibility');
        }
        
        function dateTime(){
            setValue('21');
	    setSettings('Date & Time');
        }
        
        function about(){
            setValue('22');
	    setSettings('About');
        }
        
        function widgets(){
            setValue('23');
	    setSettings('Widgets');
        }

    const wifis = [
        {
            name: 'BreezeOS',
            private: true,
            status: 'good',
            connected: true
        },
        {
            name: 'Nokia Lumia',
            private: true,
            status: 'fair'
        },
        {
            name: 'APTEK',
            private: false,
            status: 'weak'
        },
        {
            name: 'daothanhminh\'s iPhone',
            private: true,
            status: 'fair'
        },
        {
            name: 'FPT Telecom',
            private: true,
            status: 'good'
        },
        {
            name: 'Coffee Shop',
            private: true,
            status: 'fair'
        },
        {
            name: 'Samsung Galaxy S20',
            private: true,
            status: 'weak'
        },
        {
            name: 'KING COFFEE',
            private: true,
            status: 'weak'
        },
        {
            name: 'VIETTEL',
            private: true,
            status: 'fair'
        },
        {
            name: 'Nguyet Thanh',
            private: true,
            status: 'weak'
        }
    ]
    
    const [cursorMenu, showCursorMenu] = useState(false);
    const [iconsMenu, showIconsMenu] = useState(false);
    const [shellMenu, showShellMenu] = useState(false);
    const [soundMenu, showSoundMenu] = useState(false);
    const [legacyApplicationsMenu, showLegacyApplicationsMenu] = useState(false);
    const [orientationMenu, showOrientationMenu] = useState(false);
    const [resolutionMenu, showResolutionMenu] = useState(false);
    const [refreshRateMenu, showRefreshRateMenu] = useState(false);
    const [editDeviceName, allowEditDeviceName] = useState(false);

    function useOutsideCursorMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showCursorMenu(false);
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

    const cursorMenuRef = useRef(null);
    useOutsideCursorMenu(cursorMenuRef);

    function useOutsideIconsMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showIconsMenu(false);
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

    const iconsMenuRef = useRef(null);
    useOutsideIconsMenu(iconsMenuRef);

    function useOutsideShellMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showShellMenu(false);
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

    const shellMenuRef = useRef(null);
    useOutsideShellMenu(shellMenuRef);

    function useOutsideSoundMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showSoundMenu(false);
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

    const soundMenuRef = useRef(null);
    useOutsideSoundMenu(soundMenuRef);

    function useOutsideLegacyAppsMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showLegacyApplicationsMenu(false);
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

    const legacyAppsMenuRef = useRef(null);
    useOutsideLegacyAppsMenu(legacyAppsMenuRef);

    function useOutsideOrientationMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showOrientationMenu(false);
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

    const orientationMenuRef = useRef(null);
    useOutsideOrientationMenu(orientationMenuRef);

    function useOutsideResolutionMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showResolutionMenu(false);
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

    const resolutionMenuRef = useRef(null);
    useOutsideResolutionMenu(resolutionMenuRef);

    function useOutsideRRMenu(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            showRefreshRateMenu(false);
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

    const refreshRateMenuRef = useRef(null);
    useOutsideRRMenu(refreshRateMenuRef);

    const [maximumExceeded, displayMaximumExceeded] = useState(false);

    function submitDeviceName(e){
        if(e.key == 'Enter'){
            if(e.target.value.length > 43){
                displayMaximumExceeded(true);
                dispatch(setDeviceName(settingsReducer.deviceName));
            } else {
                allowEditDeviceName(false);
                dispatch(setDeviceName(e.target.value));
            }
        }
    }

    function w1(){
        dispatch(changeWallpaper('w1'));
        setValueWallpaper('1');
    }

    function w2(){
        dispatch(changeWallpaper('w2'));
        setValueWallpaper('2');
    }

    function w3(){
        dispatch(changeWallpaper('w3'));
        setValueWallpaper('3');
    }

    function w4(){
        dispatch(changeWallpaper('w4'));
        setValueWallpaper('4');
    }

    function w5(){
        dispatch(changeWallpaper('w5'));
        setValueWallpaper('5');
    }

    function w6(){
        dispatch(changeWallpaper('w6'));
        setValueWallpaper('6');
    }

	function switchTab(){
		switch(settings){
			case 'Wi-Fi':
				return (
                    <div className='WiFiWrapper'>
                        <div className='WiFi'>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                                    <p className='font-bold'>Airplane Mode</p>
                                    <div className={`Toggle ${settingsReducer.airplaneMode ? 'active' : ''}`} onClick={settingsReducer.airplaneMode ? () => dispatch(toggleAirplaneModeOff()) : () => dispatch(toggleAirplaneModeOn())}></div>
                                </div>
                                {settingsReducer.wifi ? (
                                    <>
                                        <p className='font-bold' style={{ marginBottom: '30px' }}>Visible Networks</p>
                                        <div className='VisibleNetworks'>
                                            {wifis.map((i) => 
                                                <div className='VisibleNetworksItem'>
                                                    <p>{i.name}</p>
                                                    <div className='VisibleNetworksIcon'>
                                                        {i.connected ? <i className='fa-solid fa-check'></i> : ''}
                                                        {i.private ? <i className='fa-solid fa-lock'></i> : ''}
                                                        {i.status == 'good' ? <i className='fa-solid fa-wifi'></i> : i.status == 'fair' ? <i className='fa-duotone fa-wifi-fair'></i> : i.status == 'weak' ? <i className='fa-duotone fa-wifi-weak'></i> : ''}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className='StatusWifiFalse'>
                                        <p>To get access to Internet connection, please turn on the Wi-Fi.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )
			case 'Appearance':
				return (
                    <div className='AppearanceWrapper'>
                        <div className='Appearance'>
                            <div className='WindowColors' value={settingsReducer.themeLight ? '2' : '1'}>
                                <p className='font-bold' style={{ marginBottom: '30px' }}>Window colors</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className='ImageContainer dark' style={{ marginRight: '20px' }} onClick={() => dispatch(toggleDarkMode())}>
                                        <img src={Image1}/>
                                    </div>
                                    <div className='ImageContainer light' onClick={() => dispatch(toggleLightMode())}>
                                        <img src={Image2}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='Appearance'>
                            <div className='Wallpapers' value={wallpaperValue}>
                                <p className='font-bold' style={{ marginBottom: '30px' }}>Wallpaper</p>
                                <div style={{ width: '649.516px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    <div className='WImageContainer w1' onClick={w1}>
                                        <img src={W1}/>
                                    </div>
                                    <div className='WImageContainer w2' onClick={w2}>
                                        <img src={W2}/>
                                    </div>
                                    <div className='WImageContainer w3' onClick={w3}>
                                        <img src={W3}/>
                                    </div>
                                    <div className='WImageContainer w4' onClick={w4}>
                                        <img src={W4}/>
                                    </div>
                                    <div className='WImageContainer w5' onClick={w5}>
                                        <img src={W5}/>
                                    </div>
                                    <div className='WImageContainer w6' onClick={w6}>
                                        <img src={W6}/>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', marginLeft: 'auto' }}>
                                    <div className='WallpaperMenuSection'>
                                        <p style={{ marginRight: '7px' }}>Select image...</p>
                                        <i className='fa-regular fa-image'></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='Appearance'>
                            <div className='Themes'>
                                <p className='font-bold' style={{ marginBottom: '30px' }}>Themes</p>
                                <div style={{ width: '649.516px' }}>
                                    <div className='ThemesMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-regular fa-arrow-pointer' style={{marginRight: '7px'}}></i>
                                            <p>Cursor</p>
                                        </div>
                                        <div className='ThemesMenuSection' onClick={() => showCursorMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>Default</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={cursorMenu ? 'active' : ''} ref={cursorMenuRef}>
                                            <ActMenuSelector title='Default' active></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                    <div className='ThemesMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-regular fa-icons' style={{marginRight: '7px'}}></i>
                                            <p>Icons</p>
                                        </div>
                                        <div className='ThemesMenuSection' onClick={() => showIconsMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>Default</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={iconsMenu ? 'active' : ''} ref={iconsMenuRef}>
                                            <ActMenuSelector title='Default' active></ActMenuSelector>
                                            <ActMenuSelector title='Citrus-icon-theme'></ActMenuSelector>
                                            <ActMenuSelector title='Font Awesome'></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                    <div className='ThemesMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-solid fa-browser' style={{marginRight: '7px'}}></i>
                                            <p>Shell</p>
                                        </div>
                                        <div className='ThemesMenuSection' onClick={() => showShellMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>Breeze</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={shellMenu ? 'active' : ''} ref={shellMenuRef}>
                                            <ActMenuSelector title='Breeze' active></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                    <div className='ThemesMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-regular fa-volume' style={{marginRight: '7px'}}></i>
                                            <p>Sound</p>
                                        </div>
                                        <div className='ThemesMenuSection' onClick={() => showSoundMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>Oxygen</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={soundMenu ? 'active' : ''} ref={soundMenuRef}>
                                            <ActMenuSelector title='Oxygen' active></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                    <div className='ThemesMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-solid fa-browser' style={{marginRight: '7px'}}></i>
                                            <p>Legacy Applications</p>
                                        </div>
                                        <div className='ThemesMenuSection' onClick={() => showLegacyApplicationsMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>Default</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={legacyApplicationsMenu ? 'active' : ''} ref={legacyAppsMenuRef}>
                                            <ActMenuSelector title='Default' active></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
			case 'Displays':
				return (
                    <div className='DisplaysWrapper'>
                        <div className='Displays'>
                            <div className='BuiltInDisplay'>
                                <p className='font-bold' style={{ marginBottom: '30px' }}>Built-in display</p>
                                <div style={{ width: '649.516px', display: 'flex', flexDirection: 'column' }}>
                                    <div className='BiDMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-regular fa-image-landscape' style={{marginRight: '7px'}}></i>
                                            <p>Orientation</p>
                                        </div>
                                        <div className='BiDMenuSection' onClick={() => showOrientationMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>Landscape</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={orientationMenu ? 'active' : ''} ref={orientationMenuRef}>
                                            <ActMenuSelector title='Landscape' active></ActMenuSelector>
                                            <ActMenuSelector title='Portrait'></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                    <div className='BiDMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-regular fa-expand-wide' style={{marginRight: '7px'}}></i>
                                            <p>Resolution</p>
                                        </div>
                                        <div className='BiDMenuSection' onClick={() => showResolutionMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>{window.screen.width} &times; {window.screen.height} &#40;16:9&#41;</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={resolutionMenu ? 'active' : ''} ref={resolutionMenuRef}>
                                            <ActMenuSelector title={`${window.screen.width} \u00D7 ${window.screen.height} (16:9)`} active></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                    <div className='BiDMenu'>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <i className='fa-regular fa-arrows-rotate' style={{marginRight: '7px'}}></i>
                                            <p>Refresh Rate</p>
                                        </div>
                                        <div className='BiDMenuSection' onClick={() => showRefreshRateMenu(true)}>
                                            <p style={{ marginRight: '7px' }}>60.00 Hz</p>
                                            <i className='fa-regular fa-chevron-down'></i>
                                        </div>
                                        <ActMenu style={{ zIndex: '1', width: '200px', transform: 'translate(415px, 30px)' }} className={refreshRateMenu ? 'active' : ''} ref={refreshRateMenuRef}>
                                            <ActMenuSelector title='60.00 Hz' active></ActMenuSelector>
                                            <ActMenuSelector title='50.00 Hz'></ActMenuSelector>
                                            <ActMenuSelector title='40.00 Hz'></ActMenuSelector>
                                            <ActMenuSelector title='30.00 Hz'></ActMenuSelector>
                                        </ActMenu>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
			case 'About':
				return (
                    <div className='AboutWrapper'>
                        <div className='About'>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {settingsReducer.themeLight ? <img src={LogoL} width={'331.133'} height={140} className='AboutLogo'/> : <img src={LogoD} width={'331.133'} height={140} className='AboutLogo'/>}
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                    <div className='AboutMenu' onClick={() => allowEditDeviceName(!editDeviceName)}>
                                        <p>Device Name</p>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p className='BlurText' style={{ marginRight: '15px' }}>{settingsReducer.deviceName}</p>
                                            <i className={`fa-regular fa-chevron-right ${editDeviceName ? 'rotated' : ''}`}></i>
                                        </div>
                                    </div>
                                    <div className={`AboutMenu EditName ${editDeviceName ? 'active' : ''}`}>
                                        <input className='EditNameInput' type='text' placeholder={settingsReducer.deviceName} onKeyUp={submitDeviceName}/>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>System Name</p>
                                        <p className='BlurText'>BreezeOS</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>System Version</p>
                                        <p className='BlurText'>2.0.0</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>Kernel</p>
                                        <p className='BlurText'>GNU/Linux 6.2.1 x86_64</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>Memory</p>
                                        <p className='BlurText'>{navigator.hardwareConcurrency} GB</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>Processor</p>
                                        <p className='BlurText'>Intel&reg; Core&trade; i3-6100 CPU @ 3.70GHz &times; 4</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>Graphics</p>
                                        <p className='BlurText'>Mesa Intel&reg; HD Graphics 530 &#40;SKL GT2&#41;</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>Disk Capacity</p>
                                        <p className='BlurText'>128.0 GB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
			default:
				return <p>Nothing in this section.</p>
        }
    }

    const [min, isMin] = useState(false);
    
    function close(){
        document.getElementById('settings').classList.remove('clicked');
        document.getElementsByClassName('settings')[0].classList.remove('active');
    }
    
    function minimize(){
        document.getElementsByClassName('settings')[0].classList.toggle('minimize');
        isMin(!min);
    }

        return (
            <>
                {maximumExceeded ? (
                    <div className='MaximumExceededBox'>
                        <div className='WindowTopBar'>
                            <p className='WindowTopBarTitle'>Error!</p>
                            <div class="WindowTopBarInteractionContainer">
                                <div class="WindowTopBarInteraction close" onClick={() => displayMaximumExceeded(false)}>
                                    <i class="fa-solid fa-xmark fa-lg"></i>
                                </div>
                            </div>
                        </div>
                        <div class="WindowBodyDefault">
                            <p class="WindowBodyContent">Maximum characters exceeded</p>
                            <div class="WindowBodyButton">
                                <button class="Button" onClick={() => displayMaximumExceeded(false)}>OK</button>
                            </div>
                        </div>
                    </div>
                ) : ''}
                <TopBar title='Settings' onDblClick={minimize}>
                    <div className='TabBarWrapper' style={{ width: '100%' }}>
                        <div className='TabBar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='TabBarItem' style={{ width: '207px', flexDirection: 'row-reverse' }}>
                                <div className='TabBarInteraction'>
                                	<i className="fa-regular fa-magnifying-glass"></i>
                                </div>
                            </div>
                            <div className='TabBarItem TabBarSettingsName' style={settings == 'Wi-Fi' ? { justifyContent: 'space-between' } : { justifyContent: 'center' }}>
                                {settings == 'Wi-Fi' ? (
                                    <>
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <p>{settings}</p>
                                        </div>
                                        <div className={`Toggle ${settingsReducer.wifi ? 'active' : ''}`} onClick={() => dispatch(toggleWifi())}></div>
                                    </>
                                ) : settings == 'Bluetooth' ? (
                                    <>
                                        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                            <p>{settings}</p>
                                        </div>
                                        <div className={`Toggle ${settingsReducer.bluetooth ? 'active' : ''}`} onClick={() => dispatch(toggleBluetooth())}></div>
                                    </>
                                ) : <p>{settings}</p>}
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
                    <div className='Settings'>
                        <div className='SettingsSection'>
                            <div style={{ width: '295px', height: '100%' }}>
                                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                                    <div style={{ position: 'absolute', width: '100%', maxHeight: '100%', overflowY: 'auto' }} value={value}>
                                        <div className='NavPanel'>
                                                <div className='DropdownMenu wifi' onMouseDown={wifi}>
                                                    <i className='fa-regular fa-wifi'></i>
                                                    <p className='DropdownTitle'>Wi-Fi</p>
                                                </div>
                                                <div className='DropdownMenu bluetooth' onMouseDown={bluetooth}>
                                                    <i className='fa-regular fa-bluetooth'></i>
                                                    <p className='DropdownTitle'>Bluetooth</p>
                                                </div>
                                                <div className='DropdownMenu network' onMouseDown={network}>
                                                    <i className='fa-regular fa-globe'></i>
                                                    <p className='DropdownTitle'>Network</p>
                                                </div>
                                        </div>
                                        <div className='NavPanel'>
                                                <div className='DropdownMenu appearance' onMouseDown={appearance}>
                                                    <i className='fa-regular fa-paintbrush'></i>
                                                    <p className='DropdownTitle'>Appearance</p>
                                                </div>
                                                <div className='DropdownMenu widgets' onMouseDown={widgets}>
                                                    <i className='fa-regular fa-shapes'></i>
                                                    <p className='DropdownTitle'>Widgets</p>
                                                </div>
                                                <div className='DropdownMenu notifications' onMouseDown={notifications}>
                                                    <i className='fa-regular fa-bell'></i>
                                                    <p className='DropdownTitle'>Notifications</p>
                                                </div>
                                                <div className='DropdownMenu search' onMouseDown={search}>
                                                    <i className='fa-regular fa-magnifying-glass'></i>
                                                    <p className='DropdownTitle'>Search</p>
                                                </div>
                                        </div>
                                        <div className='NavPanel'>
                                                <div className='DropdownMenu apps' onMouseDown={apps}>
                                                    <i className='fa-regular fa-grid-2'></i>
                                                    <p className='DropdownTitle'>Apps</p>
                                                </div>
                                                <div className='DropdownMenu privacy' onMouseDown={privacy}>
                                                    <i className='fa-regular fa-lock'></i>
                                                    <p className='DropdownTitle'>Privacy</p>
                                                </div>
                                                <div className='DropdownMenu security' onMouseDown={security}>
                                                    <i className='fa-solid fa-shield-halved'></i>
                                                    <p className='DropdownTitle'>Security</p>
                                                </div>
                                                <div className='DropdownMenu onlineAccounts' onMouseDown={onlineAccounts}>
                                                    <i className='fa-regular fa-at'></i>
                                                    <p className='DropdownTitle'>Online Accounts</p>
                                                </div>
                                                <div className='DropdownMenu share' onMouseDown={share}>
                                                    <i className='fa-regular fa-share-nodes'></i>
                                                    <p className='DropdownTitle'>Share</p>
                                                </div>
                                        </div>
                                        <div className='NavPanel'>
                                                <div className='DropdownMenu updates' onMouseDown={updates}>
                                                    <i className='fa-regular fa-rotate'></i>
                                                    <p className='DropdownTitle'>Updates</p>
                                                </div>
                                                <div className='DropdownMenu sound' onMouseDown={sound}>
                                                    <i className='fa-regular fa-volume'></i>
                                                    <p className='DropdownTitle'>Sound</p>
                                                </div>
                                                <div className='DropdownMenu battery' onMouseDown={battery}>
                                                    <i className='fa-regular fa-battery-full'></i>
                                                    <p className='DropdownTitle'>Battery</p>
                                                </div>
                                                <div className='DropdownMenu displays' onMouseDown={displays}>
                                                    <i className='fa-regular fa-desktop'></i>
                                                    <p className='DropdownTitle'>Displays</p>
                                                </div>
                                                <div className='DropdownMenu mouseTouchpad' onMouseDown={mouseTouchpad}>
                                                    <i className='fa-regular fa-computer-mouse'></i>
                                                    <p className='DropdownTitle'>Mouse & Touchpad</p>
                                                </div>
                                                <div className='DropdownMenu keyboard' onMouseDown={keyboard}>
                                                    <i className='fa-regular fa-keyboard'></i>
                                                    <p className='DropdownTitle'>Keyboard</p>
                                                </div>
                                                <div className='DropdownMenu printer' onMouseDown={printer}>
                                                    <i className='fa-regular fa-print'></i>
                                                    <p className='DropdownTitle'>Printer</p>
                                                </div>
                                        </div>
                                        <div className='NavPanel'>
                                                <div className='DropdownMenu regionLanguage' onMouseDown={regionLanguage}>
                                                    <i className='fa-light fa-language'></i>
                                                    <p className='DropdownTitle'>Region & Language</p>
                                                </div>
                                                <div className='DropdownMenu accessibility' onMouseDown={accessibility}>
                                                    <i className='fa-regular fa-universal-access'></i>
                                                    <p className='DropdownTitle'>Accessibility</p>
                                                </div>
                                                <div className='DropdownMenu dateTime' onMouseDown={dateTime}>
                                                    <i className='fa-regular fa-clock'></i>
                                                    <p className='DropdownTitle'>Date & Time</p>
                                                </div>
                                                <div className='DropdownMenu about' onMouseDown={about}>
                                                    <i className='fa-regular fa-circle-info'></i>
                                                    <p className='DropdownTitle'>About</p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='SettingsContainer'>
                                <div className='SettingsContainerInside'>
                                    {switchTab()}
                                </div>
                            </div>
                        </div>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='SettingsWindow'>   
                <div
                    className='Window settings'
                    key={Math.random()}
                >
                    <SettingsWindow/>
                </div>
        </div>
    )
}
