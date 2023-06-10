import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    active: false,
    hide: false
}

const calendarSlice = createSlice({
    name: 'appsCalendar',
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

export const {setActive,setHide} = calendarSlice.actions;

export default calendarSlice.reducer;