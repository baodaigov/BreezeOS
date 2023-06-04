import { useSelector, useDispatch } from 'react-redux';
import { cancelPassword } from '../../reducers/wifipassword'
import '../../components/utils/window/Window.scss';
import TopBar from '../../components/utils/window/TopBar';
import WindowBodyDefault from '../../components/utils/window/WindowBodyDefault';
import WindowBodyButton from '../../components/utils/window/WindowBodyButton';
import Draggable from 'react-draggable';
import TopBarInteraction from '../../components/utils/window/TopBarInteraction';
import './assets/index.scss';

export default function BatteryLow(props) {
    const wp = useSelector(state => state.wifipassword);
    const dispatch = useDispatch();

    return (
        <div>
                <div
                    className={`Window InsertWifiPassword ${props.onActive}`}
                    style={{ width: '450px'}}
                    key={Math.random()}
                >
                    <TopBar>
                      <TopBarInteraction action='close' onClose={() => dispatch(cancelPassword())}/>
                    </TopBar>
                    <WindowBodyDefault title={`Connect to Wi-Fi "${wp.passwordFor}"`} icon='fa-key'>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <h1>rew</h1>
                      </div>
                      <WindowBodyButton>
                        <button className='Button' key={Math.random()} onClick={() => dispatch(cancelPassword())}>Cancel</button>
                        <button className='Button' key={Math.random()}>Connect</button>
                      </WindowBodyButton>
                    </WindowBodyDefault>
                </div>
        </div>
    )
}