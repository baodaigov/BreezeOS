import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const vscodeSlice = createSlice({
    name: 'appsVscode',
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

export const {setActive,setHide} = vscodeSlice.actions;

export default vscodeSlice.reducer;