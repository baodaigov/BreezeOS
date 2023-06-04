import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    passwordFor: ''
};

export const wpSlice = createSlice({
    name: 'wifipassword',
    initialState,
    reducers: {
        insertPasswordFor: (state, action) => {
            state.passwordFor = action.payload;
            state.active = true
        },
        cancelPassword: state => {
            state.active = false
        },
    },
});

export const { insertPasswordFor, cancelPassword } = wpSlice.actions

export default wpSlice.reducer