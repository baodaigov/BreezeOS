import React, { Component } from 'react';
import './Panel.scss';
import Battery from './Battery';
import PanelItem from './PanelItem';

class PanelTop extends Component {
	showShutdownMenu(){
		document.getElementsByClassName('Panel')[0].classList.remove('active');
	}
	
	render(){
		return (
    		<div className='PanelTop'>
      			<Battery />
      			<PanelItem type='shutdownMenu'/>
    		</div>
		)
	}
}

export default PanelTop;
