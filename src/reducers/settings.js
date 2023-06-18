import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceName: 'breezeos',
    airplaneMode: false,
    wifi: true,
    wifiList: [
        {
            name: 'BreezeOS',
            private: true,
            status: 'good',
            connected: true
        },
        {
            name: 'Nokia Lumia',
            private: true,
            status: 'fair'
        },
        {
            name: 'APTEK',
            private: true,
            status: 'weak'
        },
        {
            name: 'daothanhminh\'s iPhone',
            private: true,
            status: 'fair'
        },
        {
            name: 'FPT Telecom',
            private: true,
            status: 'good'
        },
        {
            name: 'Coffee Shop',
            private: true,
            status: 'fair'
        },
        {
            name: 'Samsung Galaxy S20',
            private: true,
            status: 'weak'
        },
        {
            name: 'KING COFFEE',
            private: true,
            status: 'weak'
        },
        {
            name: 'VIETTEL',
            private: true,
            status: 'fair'
        },
        {
            name: 'Nguyet Thanh',
            private: true,
            status: 'weak'
        }
    ],
    volume: 100,
    brightness: 100,
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
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setBrightness: (state, action) => {
            state.brightness = action.payload;
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

export const { setDeviceName, toggleAirplaneModeOff, toggleAirplaneModeOn, toggleWifi, setVolume, setBrightness, toggleBluetooth, toggleLightMode, toggleDarkMode, enableBoldText, disableBoldText } = settingsSlice.actions

export default settingsSlice.reducer