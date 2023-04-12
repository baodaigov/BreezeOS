import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';
import PanelItemLarge from './PanelItemLarge';
import PanelContainer from './PanelItemContainer';
import PanelRangeContainer from './PanelRangeContainer';

class PanelBottom extends Component {
    render(){
        return (
            <div className='PanelBottom'>
                <PanelRangeContainer title='Volume' value='100'/>
                <PanelRangeContainer title='Brightness' value='100'/>
                <PanelContainer>
                    <PanelItemLarge type='night-light'/>
                    <PanelItemLarge type='wifi'/>
                </PanelContainer>
                <PanelContainer>
                    <PanelItemLarge type='airplane-mode'/>
                    <PanelItemLarge type='dark-mode'/>
                </PanelContainer>
                <PanelContainer>
                    <PanelItemLarge type='bluetooth'/>
                </PanelContainer>
            </div>
        )
    }
}

export default PanelBottom;
