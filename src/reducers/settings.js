import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceName: 'breezeos',
    airplaneMode: false,
    wifi: true,
    bluetooth: false,
    themeLight: false,
    boldText: false
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setDeviceName: (state, action) => {
            state.deviceName = action.payload
        },
        toggleAirplaneModeOff: state => {
            state.airplaneMode = false;
            state.wifi = true;
        },
        toggleAirplaneModeOn: state => {
            state.airplaneMode = true;
            state.wifi = false;
            state.bluetooth = false;
        },
        toggleWifi: state => {
            state.wifi = !state.wifi;
        },
        toggleBluetooth: state => {
            state.bluetooth = !state.bluetooth;
        },
        toggleLightMode: state => {
            state.themeLight = true;
            document.getElementsByClassName('Desktop')[0].classList.add('lightMode');
        },
        toggleDarkMode: state => {
            state.themeLight = false;
            document.getElementsByClassName('Desktop')[0].classList.remove('lightMode');
        },
        enableBoldText: state => {
            state.boldText = true;
            document.getElementsByClassName('Desktop')[0].classList.add('isBold');
        },
        disableBoldText: state => {
            state.boldText = false;
            document.getElementsByClassName('Desktop')[0].classList.remove('isBold');
        }
    },
});

export const { setDeviceName, toggleAirplaneModeOff, toggleAirplaneModeOn, toggleWifi, toggleBluetooth, toggleLightMode, toggleDarkMode, enableBoldText, disableBoldText } = settingsSlice.actions

export default settingsSlice.reducer