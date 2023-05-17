import React, { useState, useEffect } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/settings.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';
import ActMenu, { ActMenuSelector } from "../../components/utils/menu/index";
import Image1 from './assets/Screenshot from 2022-09-10 20-41-45.png';
import Image2 from './assets/favicon.ico';

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
	const [iconSize, setIconSize] = useState(70);

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
        
        const [min, isMin] = useState(false);
    
        function close(){
            document.getElementsByClassName('settings')[0].classList.remove('active');
            document.getElementById('settings').classList.remove('clicked');
        }
    
        function minimize(){
            document.getElementsByClassName('settings')[0].classList.toggle('minimize');
            isMin(!min);
        }

	function switchTab(){
		switch(settings){
			case '/':
				return (
					<div>
						<p>a</p>
		                        </div>
				)
			default:
				return <div></div>
        }
    }



        return (
            <>
                <TopBar title='Settings' onDblClick={minimize}>
                    <div className='TabBarWrapper' style={{ width: '100%' }}>
                        <div className='TabBar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='TabBarItem' style={{ width: '155px', flexDirection: 'row-reverse' }}>
                                <div className='TabBarInteraction'>
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
                    <div className='Settings'>
                        <div className='SettingsSection'>
                            <div style={{ width: '260px', maxHeight: '100%', overflowY: 'auto' }} value={value}>
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
                            	</div>
                            </div>
		            <div className='SettingsContainer'>
		                {switchTab()}	
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
