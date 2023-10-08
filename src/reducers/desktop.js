import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nightShift: false,
  hideCursor: false,
  blackScr: false,
  poweroff: false,
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    setDesktopNightShift: (state, action) => {
      state.nightShift = action.payload;
    },
    setDesktopHideCursor: (state, action) => {
      state.hideCursor = action.payload;
    },
    setDesktopBlackScr: (state, action) => {
      state.blackScr = action.payload;
    },
    setDesktopPoweroff: (state, action) => {
      state.poweroff = action.payload;
    },
  },
});

export const {
  setDesktopNightShift,
  setDesktopHideCursor,
  setDesktopBlackScr,
  setDesktopPoweroff,
} = desktopSlice.actions;

export default desktopSlice.reducer;
