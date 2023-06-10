import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const textEditorSlice = createSlice({
    name: 'appsTextEditor',
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

export const {setActive,setHide} = textEditorSlice.actions;

export default textEditorSlice.reducer;