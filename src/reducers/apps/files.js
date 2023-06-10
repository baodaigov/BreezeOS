import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const filesSlice = createSlice({
    name: 'appsFiles',
    initialState,
    reducers: {
        setActive: (state, action) => {
            state.active = action.payload;
            },
        setHide: (state, action) => {
            state.hide = action.payload;
        }
    }
});

export const {setActive,setHide} = filesSlice.actions;

export default filesSlice.reducer;