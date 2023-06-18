import { useSelector, useDispatch } from 'react-redux';
import { setVolume, setBrightness } from '../../reducers/settings';
import './Panel.scss';
import PanelItemLarge from './PanelItemLarge';
import PanelContainer from './PanelItemContainer';
import PanelRangeContainer from './PanelRangeContainer';
import RangeSlider from '../utils/range/Range';
import VolumeAdjustSound from '../../sounds/Oxygen-Sys-Special.mp3';

export default function PanelBottom(){
    const settings = useSelector(state => state.settings);
    const dispatch = useDispatch();

    function setBrightnessLevel(e){
        dispatch(setBrightness(e));
        document.getElementById('brightness').style.opacity = (100 - e) / 100;
    }

    return (
        <div className='PanelBottom'>
            <PanelRangeContainer title='Volume'>
                <RangeSlider value={settings.volume} min='0' max='100' onClick={() => new Audio(VolumeAdjustSound).play()} onInput={e => dispatch(setVolume(e.target.value))}/>
            </PanelRangeContainer>
            <PanelRangeContainer title='Brightness'>
                <RangeSlider value={settings.brightness} min='15' max='100' onInput={e => setBrightnessLevel(e.target.value)}/>
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