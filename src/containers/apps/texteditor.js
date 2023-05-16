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
    
    useEffect(() => {
	    document.addEventListener('keydown', (e) => {
	    	if(e.ctrlKey && e.keyCode === 55){
	    		toggle();
	    	}
	    })
    }, []);
    
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
        const [changes, saveChanges] = useState(false);
        const [min, isMin] = useState(false);

        function close(){
            document.getElementsByClassName('texteditor')[0].classList.remove('active');
            document.getElementById('texteditor').classList.remove('clicked');
        }

        function minimize(){
            document.getElementsByClassName('texteditor')[0].classList.toggle('minimize');
            isMin(!min)
        }

        useEffect(() => {
            document.getElementById('textEditor').addEventListener('keydown', e => {
                if(e.ctrlKey && e.keyCode === 115 || e.ctrlKey && e.keyCode === 83){
                    e.preventDefault();
                    saveChanges(!changes);
                    console.log('ok')
                }
            })
        }, [])

        return (
            <>
                <TopBar title={`${changes ? '' : '*'}hello.cpp – Text Editor`} onDblClick={minimize}>
                    <div className='TabBarWrapper'>
                        <div className='TabBar' style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
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
                        <TopBarInteraction action={min ? 'max' : 'min'} onMinMax={minimize}/>
                        <TopBarInteraction action='close' onClose={close}/>
                    </div>
                </TopBar>
                <WindowBody>
                    <div className='TextEditor'>
                        <div className='TextLineNumber'>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                            <p>7</p>
                        </div>
                        <div className='Textarea' id='textarea'>
                            <div className='TextArea' contentEditable={true} spellCheck={false}><span className='col1'>#include</span>&nbsp;<span className='col2'>&lt;iostream&gt;</span></div>
                            <div className='TextArea' contentEditable={true} spellCheck={false}></div>
                            <div className='TextArea' contentEditable={true} spellCheck={false}><span className='col1 col1a'>int</span>&nbsp;<span className='col2a'>main</span><span className='col3'>&#40;&#41;&#123;</span></div>
                            <div className='TextArea' contentEditable={true} spellCheck={false}>&nbsp;&nbsp;&nbsp;&nbsp;<span className='col4'>// This is a comment</span></div>
                            <div className='TextArea' contentEditable={true} spellCheck={false}>&nbsp;&nbsp;&nbsp;&nbsp;<span className='col4a'>std</span>::cout&nbsp;<span className='col4b'>&lt;&lt;</span>&nbsp;<span className='col2'>"Welcome to BreezeOS!"</span>&nbsp;<span className='col4b'>&lt;&lt;</span>&nbsp;<span className='col4a'>std</span>::endl;</div>
                            <div className='TextArea' contentEditable={true} spellCheck={false}>&nbsp;&nbsp;&nbsp;&nbsp;<span className='col1'>return</span>&nbsp;<span className='col5'>0</span>;</div>
                            <div className='TextArea' contentEditable={true} spellCheck={false} style={{ height: '100%' }}><span className='col3'>&#125;</span></div>
                        </div>
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
