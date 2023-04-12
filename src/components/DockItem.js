import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Dock.scss';

class DockItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }

    toggle(e){
        this.setState({active: !this.state.active});
    }
    
    getObject(){
            return (
                <div
                    className={`DockItem ${this.state.active ? "clicked" : ""}`}
                    key={this.props.id}
                    onClick={e => this.toggle(e)}
                >
                    <p className='DockItemTitle'>{this.props.title}</p>
                    <img
                        src={this.props.icon}
                        width={"35px"}
                        height={"35px"}
                    />
                </div>
            )
    }

    render(){
        return (
            <div className='DockItemContainer'>
                {this.getObject()}
            </div>
        )
    }
}

export default DockItem;