import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hour12: true,
  seconds: false,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    toggle12Hour: (state, action) => {
      state.hour12 = action.payload;
    },
    setSeconds: (state, action) => {
      state.seconds = action.payload;
    },
  },
});

export const { toggle12Hour, setSeconds } = timeSlice.actions;

export default timeSlice.reducer;
