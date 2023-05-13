import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';
import PanelItemLarge from './PanelItemLarge';
import PanelContainer from './PanelItemContainer';
import PanelRangeContainer from './PanelRangeContainer';
import RangeSlider from '../utils/range/Range';

class PanelBottom extends Component {
    render(){
        return (
            <div className='PanelBottom'>
                <PanelRangeContainer title='Volume'>
                    <RangeSlider min='0' max='100'/>
                </PanelRangeContainer>
                <PanelRangeContainer title='Brightness'>
                    <RangeSlider min='0' max='100'/>
                </PanelRangeContainer>
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
                    <PanelItemLarge type='bold-text'/>
                </PanelContainer>
            </div>
        )
    }
}

export default PanelBottom;
