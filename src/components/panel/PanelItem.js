import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Panel.scss';

class PanelItem extends Component {
    render(){
        var props = this.props.type;

        switch(props){
            case "default":
                return (
                    <div className='PanelItem font-bold'>
                        {this.props.title}
                    </div>
                )
            case "interaction":
                var action = this.props.action;
                switch (action) {
                    case "poweroff":
                        return (
                            <div className='PanelItem PanelItemInteraction'>
                                <i className="fa-solid fa-power-off"></i>
                            </div>
                        )
                    case "sleep":
                        return (
                            <div className='PanelItem PanelItemInteraction'>
                                <i className="fa-solid fa-moon"></i>
                            </div>
                        )
                    case "lock":
                        return (
                            <div className='PanelItem PanelItemInteraction'>
                                <i className="fa-solid fa-lock"></i>
                            </div>
                        )
                    case "settings":
                        return (
                            <div className='PanelItem PanelItemInteraction'>
                                <i className="fa-solid fa-gear"></i>
                            </div>
                        )
                    default:
                        return (
                            <div className='PanelItem font-bold'>
                                Please define an action type.
                            </div>
                        )
                }
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