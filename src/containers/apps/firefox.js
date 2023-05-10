import React, { useState, useEffect } from 'react';
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

export default function Firefox() {

    const FirefoxWindow = () => {
        const [url, setUrl] = useState('');
        const [hist, setHist] = useState(["https://cyplucastero.github.io/khangteo1000.github.io", "https://cyplucastero.github.io/khangteo1000.github.io"]);

        useEffect(() => {

            document.getElementById('firefox').onclick = () => {
                setUrl('https://cyplucastero.github.io/khangteo1000.github.io')
            }

        }, []);
        
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
                setHist([hist[0], qry]);
                setUrl(qry);
            }
        }

        const back = (e) => {
            setUrl(hist[0]);
            e.target.value = url;
        }

        const forward = (e) => {
            setUrl(hist[1]);
            e.target.value = url;
        }
    
        function reload(){
            document.getElementById('iFrameFF').src = document.getElementById('iFrameFF').src;
        }

        const [min, isMin] = useState(false);
    
        function close(){
            document.getElementsByClassName('firefox')[0].classList.remove('active');
            document.getElementById('firefox').classList.remove('clicked');
            setTimeout(() => {
                setUrl('');
                document.getElementById('ffsearch').value = '';
            }, 300);
        }
    
        function minimize(){
            document.getElementsByClassName('firefox')[0].classList.toggle('minimize');
            isMin(!min);
        }

        return (
            <>
                <TopBar title='Firefox' onDblClick={minimize}>
                    <div className='TabBarWrapper'>
                        <div className='TabBar'>
                            <div className='TabBarItem' style={{ justifyContent: 'space-between' }}>
                                <p>New Tab</p>
                                <div className='CloseButton' onClick={close}>
                                    <i class="fa-regular fa-xmark"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='TabBar'>
                        <div className='TabBarItem TabSearchItem' style={{ width: '800px' }}>
                            <div className='TabBarInteraction'>
                                <i className="fa-regular fa-chevron-left" onClick={back}></i>
                                <i className="fa-regular fa-chevron-right" onClick={forward}></i>
                                <i className="fa-regular fa-rotate-right" onClick={reload}></i>
                            </div>
                            <input className='TabSearch' id='ffsearch' type='text' spellCheck='false' placeholder='Search with Google or enter address' onKeyDown={action}/>
                        </div>
                    </div>
                    <div className='TopBarInteractionWrapper' style={{ display: 'flex' }}>
                        <TopBarInteraction action='hide'/>
                        <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </div>
                </TopBar>
                <WindowBody>
                    <div className='Firefox'>
                        <iframe id='iFrameFF' className='iFrameFF' src={url} title='New Tab' frameBorder='0' allowFullScreen={true}/>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='FirefoxWindow'>   
                <div
                    className='Window firefox'
                    key={Math.random()}
                >
                    <FirefoxWindow/>
                </div>
        </div>
    )
}