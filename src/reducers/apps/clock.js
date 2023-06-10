import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const clockSlice = createSlice({
    name: 'appsClock',
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

export const {setActive,setHide} = clockSlice.actions;

export default clockSlice.reducer;