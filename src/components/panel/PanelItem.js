import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';

class PanelItem extends Component {
    showShutdownMenu(){
        document.getElementsByClassName('Panel')[0].classList.remove('active');
        setTimeout(() => {
            document.getElementsByClassName('Menu')[0].classList.add('active');
            document.getElementsByClassName('PowerMenu')[0].classList.add('active');
        },100)
    }
    render(){
        var props = this.props.type;

        switch(props){
                case "default":
                    return (
                        <div className='PanelItem font-bold'>
                            {this.props.title}
                        </div>
                    )
            
                case "shutdownMenu":
                    return (
                        <div className='PanelItem PanelItemInteraction' onClick={this.showShutdownMenu}>
                            <i className="fa-solid fa-power-off"></i>
                        </div>
                    )
                default:
                    return (
                        <div className='PanelItem font-bold'>
                            Please define a specific type.
                        </div>
                    )
        }
    }
}

export default PanelItem;