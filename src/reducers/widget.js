import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clock: {
        style: 'default',
    }
}

const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        changeClockStyle: (state, action) => {
            state.clock.style = action.payload;
        }
    }
});

export const {changeClockStyle} = widgetSlice.actions;

export default widgetSlice.reducer;