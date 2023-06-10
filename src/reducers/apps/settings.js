import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
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
        }
    }
});

export const {setActive,setHide} = settingsSlice.actions;

export default settingsSlice.reducer;