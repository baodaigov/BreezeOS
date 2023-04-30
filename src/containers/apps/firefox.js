import React, { useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/firefox.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const FirefoxApp = () => {

    const toggle = () => {
        document.getElementsByClassName('FirefoxApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('firefox')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='firefox' class="FirefoxApp" title='Firefox' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg' onClick={toggle}/>
	)
};

export const FirefoxStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('FirefoxApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('firefox')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='firefox' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg' name='Firefox' onClick={toggle}/>
    )
}

export const SearchBar = () => {
    const [isTyping, setTyping] = useState(false);

    const isValidURL = (string) => {
        var res = string.match(
          /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        );
        return res !== null;
    };

    const action = (e) => {
        if (e.key === 'Enter') {
            var qry = e.target.value;
    
            if (isValidURL(qry)) {
              if (!qry.startsWith("http")) {
                qry = "https://" + qry;
              }
            } else {
              qry = "https://www.bing.com/search?q=" + encodeURIComponent(qry);
            }
    
            e.target.value = qry;
            setTyping(false);
            setTimeout(() => {
                document.getElementById('iFrameFF').src = qry;
            }, 500);
        }
    }

    const typing = (e) => {
        if (!isTyping) {
          setTyping(true);
        }
    };

    return <input className='TabSearch' type='text' spellCheck='false' placeholder='Search with Google or enter address' onKeyDown={action} onChange={typing}/>
}

export default function Firefox() {

    const FirefoxInteraction = () => {

        function reload(){
            document.getElementById('iFrameFF').src = document.getElementById('iFrameFF').src;
        }

        return (
            <div className='TabBarInteraction'>
                <i className="fa-regular fa-chevron-left"></i>
                <i className="fa-regular fa-chevron-right"></i>
                <i className="fa-regular fa-rotate-right" onClick={reload}></i>
            </div>
        )
    }

    function close(){
        document.getElementsByClassName('firefox')[0].classList.remove('active');
        document.getElementById('firefox').classList.remove('clicked');
    }

    function minimize(){
        document.getElementsByClassName('firefox')[0].classList.toggle('minimize');
    }

    return (
        <div className='FirefoxWindow'>   
                <div
                    className='Window firefox'
                    key={Math.random()}
                >
                    <TopBar title='Firefox' onDblClick={minimize}>
                        <div className='TabBarWrapper'>
                            <div className='TabBar'>
                                <div className='TabBarItem' style={{ justifyContent: 'space-between' }}>
                                    <p>New Tab</p>
                                    <div className='CloseButton' onClick={close}>
                                        <i class="fa-regular fa-xmark"></i>
                                    </div>
                                </div>
                                <div className='TabBarItem' style={{ width: "100vw" }}>
                                    <FirefoxInteraction/>
                                    <SearchBar/>
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
                        <div className='Firefox'>
                            <iframe id='iFrameFF' className='iFrameFF' src='https://www.bing.com' title='New Tab' frameBorder='0'/>
                        </div>
                    </WindowBody>
                </div>
        </div>
    )
}