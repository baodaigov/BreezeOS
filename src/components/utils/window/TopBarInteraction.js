import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Window.scss';
import '../../../Desktop.scss';

export default class TopBarInteraction extends Component {

    close(e){
        document.getElementsByClassName('Window')[0].classList.remove('active');
    }

    render(){
        var props = this.props.action;

        switch(props){
            case "close":
                return (
                    <div className={`TopBarInteraction ${props}`} key={props} onClick={e=>this.close(e)}>
                        <i class="fa-solid fa-xmark fa-lg"></i>
                    </div>
                )

            case "hide":
                return (
                    <div className={`TopBarInteraction ${props}`} key={props}>
                        <i class="fa-solid fa-chevron-down"></i>
                    </div>
                )

            case "minMax":
                return (
                    <div className={`TopBarInteraction ${props}`} key={props}>
                        <i class="fa-regular fa-window-restore fa-sm"></i>
                    </div>
                )
        }
    }
}
