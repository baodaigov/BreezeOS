import React, { useState, useEffect, useRef } from 'react';
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
import os from 'os-browserify'

export const SettingsApp = () => {

    const toggle = () => {
        document.getElementsByClassName('SettingsApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('settings')[0].classList.add('active');
        }, 500);
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
        document.getElementsByClassName('SettingsApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('settings')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='settings' icon='https:\/\/raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/applications-system.svg' name='Settings' onClick={toggle}/>
    )
}

export default function Settings(){

    const SettingsWindow = () => {
    	const [value, setValue] = useState('1');
	const [settings, setSettings] = useState('Wi-Fi');
    const [statusWifi, setStatusWifi] = useState(true);

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

    const [valueWindowColors, setValueWindowColors] = useState('1');
    const [cursorMenu, showCursorMenu] = useState(false);
    const [iconsMenu, showIconsMenu] = useState(false);
    const [shellMenu, showShellMenu] = useState(false);
    const [soundMenu, showSoundMenu] = useState(false);
    const [legacyApplicationsMenu, showLegacyApplicationsMenu] = useState(false);

    function switchDark(){
        setValueWindowColors('1');
        document.getElementsByClassName('Desktop')[0].classList.remove('lightMode');
    }

    function switchLight(){
        setValueWindowColors('2');
        document.getElementsByClassName('Desktop')[0].classList.add('lightMode');
    }

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

	function switchTab(){
		switch(settings){
			case 'Wi-Fi':
				return (
                    <div className='WiFiWrapper'>
                        <div className='WiFi'>
                            {statusWifi ? (
                                <div style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
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
                                </div>
                            ) : (
                                <div className='StatusWifiFalse'>
                                    <p>To get access to Internet connection, please turn on the Wi-Fi.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )
			case 'Appearance':
				return (
                    <div className='AppearanceWrapper'>
                        <div className='Appearance'>
                            <div className='WindowColors' value={valueWindowColors}>
                                <p className='font-bold' style={{ marginBottom: '30px' }}>Window colors</p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className='ImageContainer dark' style={{ marginRight: '20px' }} onClick={switchDark}>
                                        <img src={Image1}/>
                                    </div>
                                    <div className='ImageContainer light' onClick={switchLight}>
                                        <img src={Image2}/>
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
                                        <div className='ThemesMenuSection' onClick={() => showCursorMenu(!cursorMenu)}>
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
                                        <div className='ThemesMenuSection' onClick={() => showIconsMenu(!iconsMenu)}>
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
                                        <div className='ThemesMenuSection' onClick={() => showShellMenu(!shellMenu)}>
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
                                        <div className='ThemesMenuSection' onClick={() => showSoundMenu(!soundMenu)}>
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
                                        <div className='ThemesMenuSection' onClick={() => showLegacyApplicationsMenu(!legacyApplicationsMenu)}>
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
			case 'About':
				return (
                    <div className='AboutWrapper'>
                        <div className='About'>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <img src={LogoD} width={'331.133'} height={140} className='AboutLogo'/>
                                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                    <div className='AboutMenu'>
                                        <p>Device Name</p>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <p className='BlurText' style={{ marginRight: '10px' }}>BreezeOS</p>
                                            <i className='fa-regular fa-chevron-right'></i>
                                        </div>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>OS Version</p>
                                        <p className='BlurText'>2.0.0</p>
                                    </div>
                                    <div className='AboutMenu'>
                                        <p>Memory</p>
                                        <p className='BlurText'>{navigator.hardwareConcurrency} GiB</p>
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
        document.getElementsByClassName('settings')[0].classList.remove('active');
        document.getElementById('settings').classList.remove('clicked');
    }
    
    function minimize(){
        document.getElementsByClassName('settings')[0].classList.toggle('minimize');
        isMin(!min);
    }

        return (
            <>
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
                                        <div className={`Toggle ${statusWifi ? 'active' : ''}`} onClick={() => setStatusWifi(!statusWifi)}></div>
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
