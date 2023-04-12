import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import './Panel.scss';
import Battery from './Battery';
import PanelItem from './PanelItem';

class PanelTop extends Component {
	render(){
		return (
    		<div className='PanelTop'>
      			<Battery />
      			<PanelItem type='interaction' action='poweroff'/>
    		</div>
		)
	}
}

export default PanelTop;
