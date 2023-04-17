import React, { Component, lazy } from 'react';
import ReactDOM, { render } from 'react-dom';
import './Panel.scss';
import Battery from './Battery';
import PanelItem from './PanelItem';
const Menu = lazy(() => import('../menu/Menu'));

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
