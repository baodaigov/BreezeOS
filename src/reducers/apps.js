import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: {
        active: false,
        min: false,
        value: '1',
        settings: 'Wi-Fi',
        wallpaperValue: '1',
    }
}

export const appsSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {
        toggleAppSettings: (state, action) => {
            state.settings.active = action.payload;
        },
        toggleMinSettings: (state, action) => {
            state.settings.min = action.payload;
        },
        setValue: (state, action) => {
            state.settings.value = action.payload;
        },
        setSettings: (state, action) => {
            state.settings.settings = action.payload;
        },
        setValueWallpaper: (state, action) => {
            state.settings.wallpaperValue = action.payload;
        }
    },
});

export const { toggleAppSettings, toggleMinSettings, setValue, setSettings, setValueWallpaper } = appsSlice.actions

export default appsSlice.reducer