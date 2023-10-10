import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  iconTheme: string;
}

const initialState: StateType = {
  iconTheme: "Default",
};

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    switchIcons: (state, action: PayloadAction<string>) => {
      state.iconTheme = action.payload;
    },
  },
});

export const { switchIcons } = appearanceSlice.actions;

export default appearanceSlice.reducer;
