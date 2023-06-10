import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const softwareStoreSlice = createSlice({
    name: 'appsSoftwareStore',
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

export const {setActive,setHide} = softwareStoreSlice.actions;

export default softwareStoreSlice.reducer;