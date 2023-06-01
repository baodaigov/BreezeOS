import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openUrl, closeUrl } from '../../reducers/firefox';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/firefox.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const FirefoxApp = () => {
    const dispatch = useDispatch();
    
    const toggle = () => {
        document.getElementsByClassName('FirefoxApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('firefox')[0].classList.add('active');
            dispatch(openUrl('https://breezeos.github.io'));
        }, 500);
    };
    
    useEffect(() => {
	    document.addEventListener('keydown', (e) => {
	    	if(e.ctrlKey && e.keyCode === 49){
	    		toggle();
	    	}
	    })
    }, []);
    
	return (
		<DockItem id='firefox' class="FirefoxApp" title='Firefox' number='1' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg' onClick={toggle}/>
	)
};

export const FirefoxStartApp = () => {
    const dispatch = useDispatch();
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('FirefoxApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('firefox')[0].classList.add('active');
            dispatch(openUrl('https://breezeos.github.io'));
        }, 500);
    };

    return (
        <StartApp key='firefox' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/firefox.svg' name='Firefox' onClick={toggle}/>
    )
}

export default function Firefox() {
    const FirefoxWindow = () => {
        const url = useSelector(state => state.firefox.url);
        const dispatch = useDispatch();
        const [hist, setHist] = useState(["https://breezeos.github.io", "https://breezeos.github.io"]);
        
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
                dispatch(openUrl(qry));
            }
        }
    
        function reload(){
            document.getElementById('iFrameFF').src = document.getElementById('iFrameFF').src;
        }

        const [min, isMin] = useState(false);
    
        function close(){
            document.getElementsByClassName('firefox')[0].classList.remove('active');
            document.getElementById('firefox').classList.remove('clicked');
            setTimeout(() => {
                dispatch(closeUrl());
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
                        <div className='TabBarItem TabSearchItem' style={{ width: '700px' }}>
                            <div className='TabBarInteraction'>
                                <i className="fa-regular fa-chevron-left" onClick={() => dispatch(openUrl(hist[0]))}></i>
                                <i className="fa-regular fa-chevron-right" onClick={() => dispatch(openUrl(hist[1]))}></i>
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
