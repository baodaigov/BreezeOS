import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: ''
}

const vscodeSlice = createSlice({
    name: 'vscode',
    initialState,
    reducers: {
        openUrl: state => {
            state.url = 'https://github1s.com/baodaigov/BreezeOS'
        },
        closeUrl: state => {
            state.url = ''
        }
    }
});

export const {openUrl,closeUrl} = vscodeSlice.actions;

export default vscodeSlice.reducer;