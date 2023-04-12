import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../Desktop.scss';
import '../components/Header.scss';

class Task extends Component {
    constructor(props){
        super(props);
        this.state = {
            active: false
        }
    }

    toggle(e){
        this.setState({active: !this.state.active});
        document.getElementsByClassName('Panel')[0].classList.toggle('active')
    }

    render(){
        return (
            <div className='Task Header-item' onClick={e => this.toggle(e)}>
                {this.props.children}
            </div>
        )
    }
}

export default Task;
