import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    charging: false
}

const batterySlice = createSlice({
    name: 'battery',
    initialState,
    reducers: {
        setCharging: (state, action) => {
            state.charging = action.payload;
        }
    }
});

export const {setCharging} = batterySlice.actions;

export default batterySlice.reducer;