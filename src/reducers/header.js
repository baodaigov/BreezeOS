import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    type: 'default',
    width: 900,
}

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderActive: (state, action) => {
            state.active = action.payload;
        },
        setHeaderType: (state, action) => {
            state.type = action.payload;
        },
        setWidth: (state, action) => {
            state.width = action.payload;
        }
    }
});

export const {setHeaderActive,setHeaderType,setWidth} = headerSlice.actions;

export default headerSlice.reducer;