import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontFamily: "OptimisticDisplay",
  fontSize: "medium",
  fontWeight: 700,
  foregroundColor: "#e2e2e2",
  optionsMenuShown: false,
};

export const lockSlice = createSlice({
  name: "lock",
  initialState,
  reducers: {
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
  },
});

export const {
  setFontFamily,
  setFontSize,
  setFontWeight,
  setForegroundColor,
  setOptionsMenuShown,
} = lockSlice.actions;

export default lockSlice.reducer;
