import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    clock: {
        active: true,
        style: 'default',
        seconds: false
    }
}

const widgetSlice = createSlice({
    name: 'widget',
    initialState,
    reducers: {
        addWidget: (state, action) => {
            state.widget = [...state.widget, action.payload];
        },
        removeClock: state => {
            state.clock.active = false;
        },
        changeClockStyle: (state, action) => {
            state.clock.style = action.payload;
        },
        displaySeconds: (state, action) => {
            state.clock.seconds = action.payload;
        }
    }
});

export const {addWidget,removeClock,changeClockStyle,displaySeconds} = widgetSlice.actions;

export default widgetSlice.reducer;