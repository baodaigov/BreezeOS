import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  wrapperActive: false,
  fontFamily: "OptimisticDisplay",
  fontSize: "medium",
  fontWeight: 700,
  foregroundColor: "#e2e2e2",
  optionsMenuShown: false,
  splashScreen: {
    wrapperActive: true,
    wrapperHideInfo: false,
  },
};

export const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: {
    setLockScreenActive: (state, action) => {
      state.active = action.payload;
    },
    setLockScreenWrapperActive: (state, action) => {
      state.wrapperActive = action.payload;
    },
    setFontFamily: (state, action) => {
      state.fontFamily = action.payload;
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontWeight: (state, action) => {
      state.fontWeight = action.payload;
    },
    setForegroundColor: (state, action) => {
      state.foregroundColor = action.payload;
    },
    setOptionsMenuShown: (state, action) => {
      state.optionsMenuShown = action.payload;
    },
    setSplashScreenWrapperActive: (state, action) => {
      state.splashScreen.wrapperActive = action.payload;
    },
    setSplashScreenWrapperHideInfo: (state, action) => {
      state.splashScreen.wrapperHideInfo = action.payload;
    },
  },
});

export const {
  setLockScreenActive,
  setLockScreenWrapperActive,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setForegroundColor,
  setOptionsMenuShown,
  setSplashScreenWrapperActive,
  setSplashScreenWrapperHideInfo,
} = lockSlice.actions;

export default lockSlice.reducer;
