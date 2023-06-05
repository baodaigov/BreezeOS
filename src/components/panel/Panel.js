import './Panel.scss';
import PanelTop from './PanelTop';
import PanelBottom from './PanelBottom';

const Panel = props => {
    return (
        <div className='Panel' style={props.style}>
            <PanelTop/>
            <PanelBottom/>
        </div>
    )
}

export default Panel;