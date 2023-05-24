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
        },
        toggleDarkMode: (state) => {
            state.themeLight = false;
        }
    },
});

export const { toggleLightMode, toggleDarkMode } = settingsSlice.actions

export default settingsSlice.reducer