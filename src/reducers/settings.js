import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    airplaneMode: false,
    wifi: true,
    bluetooth: false,
    themeLight: false,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleAirplaneModeOff: (state) => {
            state.airplaneMode = false;
            state.wifi = true;
        },
        toggleAirplaneModeOn: (state) => {
            state.airplaneMode = true;
            state.wifi = false;
            state.bluetooth = false;
        },
        toggleWifi: (state) => {
            state.wifi = !state.wifi;
        },
        toggleBluetooth: (state) => {
            state.bluetooth = !state.bluetooth;
        },
        toggleLightMode: (state) => {
            state.themeLight = true;
            document.getElementsByClassName('Desktop')[0].classList.add('lightMode');
        },
        toggleDarkMode: (state) => {
            state.themeLight = false;
            document.getElementsByClassName('Desktop')[0].classList.remove('lightMode');
        }
    },
});

export const { toggleAirplaneModeOff, toggleAirplaneModeOn, toggleWifi, toggleBluetooth, toggleLightMode, toggleDarkMode } = settingsSlice.actions

export default settingsSlice.reducer