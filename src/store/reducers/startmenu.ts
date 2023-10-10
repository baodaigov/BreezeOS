import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
}

const initialState: StateType = {
  active: false,
};

export const startMenuSlice = createSlice({
  name: "startmenu",
  initialState,
  reducers: {
    setStartMenuActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const { setStartMenuActive } = startMenuSlice.actions;

export default startMenuSlice.reducer;
