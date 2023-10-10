import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  clock: {
    active: boolean;
    style: string;
    seconds: boolean;
  };
}

const initialState: StateType = {
  clock: {
    active: true,
    style: "default",
    seconds: false,
  },
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    removeClock: (state) => {
      state.clock.active = false;
    },
    changeClockStyle: (state, action: PayloadAction<string>) => {
      state.clock.style = action.payload;
    },
    displaySeconds: (state, action: PayloadAction<boolean>) => {
      state.clock.seconds = action.payload;
    },
  },
});

export const { removeClock, changeClockStyle, displaySeconds } =
  widgetSlice.actions;

export default widgetSlice.reducer;
