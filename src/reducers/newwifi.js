import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    name: '',
    security: 'WPA2'
};

export const wpSlice = createSlice({
    name: 'newwifi',
    initialState,
    reducers: {
        toggleActive: (state, action) => {
            state.active = action.payload
        },
        setWifiName: (state, action) => {
            state.name = action.payload
        },
        setSecurity: (state, action) => {
            state.security = action.payload
        },
        setInactive: state => {
            state.active = false
            state.name = ''
            state.security = 'None'
        }
    },
});

export const { toggleActive, setSecurity, setWifiName, setInactive } = wpSlice.actions

export default wpSlice.reducer