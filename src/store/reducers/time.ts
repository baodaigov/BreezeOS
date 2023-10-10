import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  hour12: boolean;
  seconds: boolean;
}

const initialState: StateType = {
  hour12: true,
  seconds: false,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    toggle12Hour: (state, action: PayloadAction<boolean>) => {
      state.hour12 = action.payload;
    },
    setSeconds: (state, action: PayloadAction<boolean>) => {
      state.seconds = action.payload;
    },
  },
});

export const { toggle12Hour, setSeconds } = timeSlice.actions;

export default timeSlice.reducer;
