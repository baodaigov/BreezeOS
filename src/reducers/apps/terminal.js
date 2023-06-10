import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const terminalSlice = createSlice({
    name: 'appsTerminal',
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

export const {setActive,setHide} = terminalSlice.actions;

export default terminalSlice.reducer;