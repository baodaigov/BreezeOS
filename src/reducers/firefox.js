import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: ''
}

const firefoxSlice = createSlice({
    name: 'firefox',
    initialState,
    reducers: {
        openUrl: (state, action) => {
            state.url = action.payload
        },
        closeUrl: state => {
            state.url = ''
        }
    }
});

export const {openUrl,closeUrl} = firefoxSlice.actions;

export default firefoxSlice.reducer;