import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false,
    settings: 'Wi-Fi'
}

const settingsSlice = createSlice({
    name: 'appsSettings',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.active = action.payload;
            state.hide = false
        },
        setHide: (state, action) => {
            state.hide = action.payload;
        },
        setSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

export const {setActive,setHide,setSettings} = settingsSlice.actions;

export default settingsSlice.reducer;