import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeLight: false,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
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

export const { toggleLightMode, toggleDarkMode } = settingsSlice.actions

export default settingsSlice.reducer