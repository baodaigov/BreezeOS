import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    passwordFor: '',
    value: '',
    disabled: false,
    isShow: false,
    isWrong: false
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
            state.value = ''
            state.isWrong = false
        },
        setInputPassword: (state, action) => {
            state.value = action.payload
        },
        setPasswordDisable: (state, action) => {
            state.disabled = action.payload
        },
        displayPassword: (state, action) => {
            state.isShow = action.payload
        },
        setWrongPassword: (state, action) => {
            state.isWrong = action.payload
        }
    },
});

export const { insertPasswordFor, cancelPassword, setInputPassword, setPasswordDisable, displayPassword, setWrongPassword } = wpSlice.actions

export default wpSlice.reducer