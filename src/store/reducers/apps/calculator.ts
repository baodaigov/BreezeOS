import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps } from "../../../../types";

interface StateType extends Apps {
  recentResult: string | null;
}

const initialState: StateType = {
  active: false,
  hide: false,
  recentResult: null,
};

const calculatorSlice = createSlice({
  name: "appsCalculator",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setRecentResult: (state, action: PayloadAction<string>) => {
      state.recentResult = action.payload;
    },
  },
});

export const { setActive, setHide, setRecentResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
