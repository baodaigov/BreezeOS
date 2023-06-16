import {useSelector, useDispatch} from "react-redux";
import {setActive} from "../../reducers/apps/settings";
import {inactivePanel} from '../../reducers/panel';
import { insertPasswordFor } from '../../reducers/wifipassword';
import {switchType} from "../../reducers/panel";
import {toggleBluetooth, toggleWifi} from "../../reducers/settings";
import {toggleActive} from "../../reducers/newwifi";
import './Panel.scss';
import PanelTop from './PanelTop';
import PanelBottom from './PanelBottom';

const Panel = props => {
    const panelType = useSelector(state => state.panel.type);
    const settings = useSelector(state => state.settings);
    const shellTheme = useSelector(state => state.shell.theme);
    const dispatch = useDispatch();

    function connectWifi(e){
        dispatch(inactivePanel());
        dispatch(setActive(true));
        setTimeout(() => {
            dispatch(insertPasswordFor(e));
        }, 800);
    }

    function connectOtherWifi(){
        dispatch(inactivePanel());
        dispatch(setActive(true));
        setTimeout(() => {
            dispatch(toggleActive(true));
        }, 800);
    }

    return (
        <div className={`Panel ${shellTheme === 'WhiteSur' ? 'whitesur' : ''}`} style={props.style}>
            <div style={{ position: 'relative' }}>
                <div className='PanelTypeContainer' style={{ transform: `translateX(${panelType === 'default' ? '0' : panelType === 'wifi' ? '-330px' : panelType === 'bluetooth' ? '-653px' : '0'})`}}>
                    <div className={`defaultPanel ${panelType === 'default' ? 'active' : ''}`}>
                        <PanelTop/>
                        <PanelBottom/>
                    </div>
                    <div className={`wifiPanel ${panelType === 'wifi' ? 'active' : ''}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '324px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='PanelItem PanelItemInteraction' onClick={() => dispatch(switchType('default'))}>
                                    <i className="fa-solid fa-chevron-left" style={{ marginRight: '0' }}></i>
                                </div>
                                <p className='PanelName'>Wi-Fi</p>
                            </div>
                            <div className={`Toggle ${shellTheme === 'WhiteSur' ? 'whitesur' : ''} ${settings.wifi ? 'active' : ''}`} onClick={() => dispatch(toggleWifi())}></div>
                        </div>
                        {settings.wifi ? (
                            <div className='WifiList'>
                                {settings.wifiList.map(i => (
                                    <>
                                        {i.connected ? (
                                            <div className='WifiListItem'>
                                                <p className='WifiName'>{i.name}</p>
                                                <div className='WifiListIcon'>
                                                    <i className='fa-solid fa-check'></i>
                                                    {i.private ? <i className='fa-solid fa-lock'></i> : ''}
                                                    {i.status === 'good' ? <i className='fa-solid fa-wifi'></i> : i.status === 'fair' ? <i className='fa-duotone fa-wifi-fair'></i> : i.status === 'weak' ? <i className='fa-duotone fa-wifi-weak'></i> : ''}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='WifiListItem' onClick={() => connectWifi(i.name)}>
                                                <p className='WifiName'>{i.name}</p>
                                                <div className='WifiListIcon'>
                                                    {i.private ? <i className='fa-solid fa-lock'></i> : ''}
                                                    {i.status === 'good' ? <i className='fa-solid fa-wifi'></i> : i.status === 'fair' ? <i className='fa-duotone fa-wifi-fair'></i> : i.status === 'weak' ? <i className='fa-duotone fa-wifi-weak'></i> : ''}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ))}
                                <div className='WifiListItem' onClick={connectOtherWifi}>
                                    <p className='WifiName'>Other...</p>
                                </div>
                            </div>
                        ) : (
                            <div className='WifiStatusFalse'>
                                <i className='fa-solid fa-wifi-slash'></i>
                                <p className='Title font-bold'>Wi-Fi Has Turned Off</p>
                            </div>
                        )}
                    </div>
                    <div className={`bluetoothPanel ${panelType === 'bluetooth' ? 'active' : ''}`}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '324px' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className='PanelItem PanelItemInteraction' onClick={() => dispatch(switchType('default'))}>
                                    <i className="fa-solid fa-chevron-left" style={{ marginRight: '0' }}></i>
                                </div>
                                <p className='PanelName'>Bluetooth</p>
                            </div>
                            <div className={`Toggle ${shellTheme === 'WhiteSur' ? 'whitesur' : ''} ${settings.bluetooth ? 'active' : ''}`} onClick={() => dispatch(toggleBluetooth())}></div>
                        </div>
                        {settings.bluetooth ? (
                            <p className='Description'>Now discoverable as "{settings.deviceName}"</p>
                        ) : (
                            <div className='BluetoothStatusFalse'>
                                <i className='fa-solid fa-bluetooth'></i>
                                <p className='Title font-bold'>Bluetooth Has Turned Off</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panel;