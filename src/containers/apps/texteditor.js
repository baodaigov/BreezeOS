import React, { useEffect, useState } from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import DockItem from '../../components/DockItem';
import './assets/texteditor.scss';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import StartApp from '../../components/startMenu/StartApp';

export const TextEditorApp = () => {

    const toggle = () => {
        document.getElementsByClassName('TextEditorApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('texteditor')[0].classList.add('active');
        }, 500);
    };
    
	return (
		<DockItem id='texteditor' class="TextEditorApp" title='Text Editor' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg' onClick={toggle}/>
	)
};

export const TextEditorStartApp = () => {
    
    const toggle = () => {
        document.getElementsByClassName('StartMenuWrapper')[0].classList.remove('active');
        document.getElementsByClassName('Header')[0].classList.add('active');
        document.getElementsByClassName('DesktopBody')[0].classList.add('active');
        document.getElementsByClassName('TextEditorApp')[0].classList.add('clicked')
        setTimeout(() => {
            document.getElementsByClassName('texteditor')[0].classList.add('active');
        }, 500);
    };

    return (
        <StartApp key='texteditor' icon='https://raw.githubusercontent.com/yeyushengfan258/Citrus-icon-theme/7fac80833a94baf4d4a9132ea9475c2b819b5827/src/scalable/apps/accessories-text-editor.svg' name='Text Editor' onClick={toggle}/>
    )
}

export default function TextEditor() {
    const TextEditorWindow = () => {
        const [changes, saveChanges] = useState(true);

        function close(){
            document.getElementsByClassName('texteditor')[0].classList.remove('active');
            document.getElementById('texteditor').classList.remove('clicked');
            setTimeout(saveChanges(true), 300);
        }

        function minimize(){
            document.getElementsByClassName('texteditor')[0].classList.toggle('minimize');
        }

        useEffect(() => {
            document.getElementById('textEditor').addEventListener('keydown', e => {
                if(e.ctrlKey && e.keyCode === 115 || e.ctrlKey && e.keyCode === 83){
                    saveChanges(!changes);
                    console.log('ok')
                }
            })
        }, [])

        return (
            <>
                <TopBar title={`${changes ? '*' : ''}Untitled Document`} onDblClick={minimize}>
                    <div className='TabBarWrapper' style={{ width: '100%' }}>
                        <div className='TabBar' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div className='TabBarItem TabBarOpenFile'>
                                <p>Open</p>
                                <i className="fa-regular fa-chevron-down"></i>
                            </div>
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
                        <TopBarInteraction action='minMax' onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </div>
                </TopBar>
                <WindowBody>
                    <div className='TextEditor'>
                        <textarea className='TextareaEditor' spellCheck={false}></textarea>
                    </div>
                </WindowBody>
            </>
        )
    }

    return (
        <div className='TextEditorWindow'>   
                <div
                    className='Window texteditor'
                    id='textEditor'
                    key={Math.random()}
                >
                    <TextEditorWindow/>
                </div> 
        </div>
    )
}
