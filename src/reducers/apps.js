import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    settings: {
        active: false,
        min: false,
        value: '1',
        settings: 'Wi-Fi',
        wallpaperValue: '1',
    },
    software: {
        active: false,
        min: false,
    },
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
        },
        toggleAppSoftware: (state, action) => {
            state.software.active = action.payload;
        },
        toggleMinSoftware: (state, action) => {
            state.software.min = action.payload;
        },
    },
});

export const { toggleAppSettings, toggleMinSettings, setValue, setSettings, setValueWallpaper, toggleAppSoftware, toggleMinSoftware } = appsSlice.actions

export default appsSlice.reducer