import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  hide: false,
  recentResult: null
};

const calculatorSlice = createSlice({
  name: "appsCalculator",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setHide: (state, action) => {
      state.hide = action.payload;
    },
    setRecentResult: (state, action) => {
      state.recentResult = action.payload;
    },
  },
});

export const { setActive, setHide, setRecentResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
