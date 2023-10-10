import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
}

const initialState: StateType = {
  active: false,
};

const terminalWindowSlice = createSlice({
  name: "terminalwindow",
  initialState,
  reducers: {
    setTerminalWindowActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const { setTerminalWindowActive } = terminalWindowSlice.actions;

export default terminalWindowSlice.reducer;
