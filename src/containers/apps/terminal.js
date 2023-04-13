import React from 'react';
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBody from '../../components/utils/window/WindowBody';
import './assets/terminal.scss';
import Draggable from 'react-draggable';

export default function Terminal() {
    return (
        <div>
            <Draggable>
                <div
                    className='Window terminal'
                    key={Math.random()}
                >
                    <TopBar title='Terminal'/>
                    <WindowBody>
                        <div className='Terminal'>
                            <pre>$ json</pre>
                        </div>
                    </WindowBody>
                </div>
            </Draggable>
        </div>
    )
}
