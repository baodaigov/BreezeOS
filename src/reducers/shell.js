import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'Breeze'
};

export const shellSlice = createSlice({
    name: 'shell',
    initialState,
    reducers: {
        changeShell: (state, action) => {
            state.theme = action.payload;
        }
    },
});

export const { changeShell } = shellSlice.actions

export default shellSlice.reducer