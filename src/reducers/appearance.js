import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    iconTheme: 'Default'
}

export const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        switchIcons: (state, action) => {
            state.iconTheme = action.payload;
        }
    },
});

export const { switchIcons } = appearanceSlice.actions

export default appearanceSlice.reducer