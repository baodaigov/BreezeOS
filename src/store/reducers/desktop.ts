import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  nightShift: boolean;
  hideCursor: boolean;
  blackScr: boolean;
  poweroff: boolean;
}

const initialState: StateType = {
  nightShift: false,
  hideCursor: false,
  blackScr: false,
  poweroff: false,
};

const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    setDesktopNightShift: (state, action: PayloadAction<boolean>) => {
      state.nightShift = action.payload;
    },
    setDesktopHideCursor: (state, action: PayloadAction<boolean>) => {
      state.hideCursor = action.payload;
    },
    setDesktopBlackScr: (state, action: PayloadAction<boolean>) => {
      state.blackScr = action.payload;
    },
    setDesktopPoweroff: (state, action: PayloadAction<boolean>) => {
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
