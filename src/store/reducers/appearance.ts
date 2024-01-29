import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateType {
  themeLight: boolean;
}

const initialState: StateType = {
  themeLight: false,
};

export const appearanceSlice = createSlice({
  name: "appearance",
  initialState,
  reducers: {
    toggleLightMode: (state, action: PayloadAction<boolean>) => {
      state.themeLight = action.payload;
    },
  },
});

export const { toggleLightMode } = appearanceSlice.actions;

export default appearanceSlice.reducer;
