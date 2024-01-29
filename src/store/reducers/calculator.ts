import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  recentResult: string | null;
}

const initialState: StateType = {
  recentResult: null,
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    setRecentResult: (state, action: PayloadAction<string>) => {
      state.recentResult = action.payload;
    },
  },
});

export const { setRecentResult } = calculatorSlice.actions;

export default calculatorSlice.reducer;
