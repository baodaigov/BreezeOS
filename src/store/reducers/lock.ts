import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  wrapperActive: boolean;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  foregroundColor: string;
  optionsMenuShown: boolean;
  splashScreen: {
    wrapperActive: boolean;
    wrapperHideInfo: boolean;
  };
}

const initialState: StateType = {
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
    setLockScreenActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setLockScreenWrapperActive: (state, action: PayloadAction<boolean>) => {
      state.wrapperActive = action.payload;
    },
    setFontFamily: (state, action: PayloadAction<string>) => {
      state.fontFamily = action.payload;
    },
    setFontSize: (state, action: PayloadAction<string>) => {
      state.fontSize = action.payload;
    },
    setFontWeight: (state, action: PayloadAction<number>) => {
      state.fontWeight = action.payload;
    },
    setForegroundColor: (state, action: PayloadAction<string>) => {
      state.foregroundColor = action.payload;
    },
    setOptionsMenuShown: (state, action: PayloadAction<boolean>) => {
      state.optionsMenuShown = action.payload;
    },
    setSplashScreenWrapperActive: (state, action: PayloadAction<boolean>) => {
      state.splashScreen.wrapperActive = action.payload;
    },
    setSplashScreenWrapperHideInfo: (state, action: PayloadAction<boolean>) => {
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
