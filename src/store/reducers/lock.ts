import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  splashScreen: {
    wrapperActive: boolean;
    wrapperHideInfo: boolean;
  };
  wrapperActive: boolean;
  isEditable: boolean;
  type: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  foregroundColor: string;
  style: {
    family: string;
    weight: {
      light?: number;
      medium?: number;
      bold?: number;
    };
  }[];
  widgets: string[];
  optionsMenuShown: boolean;
}

const initialState: StateType = {
  active: false,
  splashScreen: {
    wrapperActive: true,
    wrapperHideInfo: false,
  },
  wrapperActive: false,
  isEditable: false,
  type: "default",
  fontFamily: "OptimisticDisplay",
  fontSize: "medium",
  fontWeight: 700,
  foregroundColor: "#e2e2e2",
  style: [
    {
      family: "OptimisticDisplay",
      weight: {
        light: 200,
        medium: 500,
        bold: 700,
      },
    },
    {
      family: "SanFrancisco",
      weight: {
        light: 200,
        medium: 500,
        bold: 700,
      },
    },
    {
      family: "TiemposFine",
      weight: {
        medium: 500,
        bold: 700,
      },
    },
  ],
  widgets: ["date", "battery"],
  optionsMenuShown: false,
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
    setSplashScreenWrapperActive: (state, action: PayloadAction<boolean>) => {
      state.splashScreen.wrapperActive = action.payload;
    },
    setSplashScreenWrapperHideInfo: (state, action: PayloadAction<boolean>) => {
      state.splashScreen.wrapperHideInfo = action.payload;
    },
    setEditable: (state, action: PayloadAction<boolean>) => {
      state.isEditable = action.payload;
    },
    setLockScreenType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
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
    setWidgets: (state, action: PayloadAction<string[]>) => {
      state.widgets = action.payload;
    },
    setOptionsMenuShown: (state, action: PayloadAction<boolean>) => {
      state.optionsMenuShown = action.payload;
    },
  },
});

export const {
  setLockScreenActive,
  setLockScreenWrapperActive,
  setLockScreenType,
  setEditable,
  setFontFamily,
  setFontSize,
  setFontWeight,
  setForegroundColor,
  setWidgets,
  setOptionsMenuShown,
  setSplashScreenWrapperActive,
  setSplashScreenWrapperHideInfo,
} = lockSlice.actions;

export default lockSlice.reducer;
