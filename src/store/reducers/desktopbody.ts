import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
}

const initialState: StateType = {
  active: false,
};

const desktopBodySlice = createSlice({
  name: "desktopbody",
  initialState,
  reducers: {
    setDesktopBodyActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const { setDesktopBodyActive } = desktopBodySlice.actions;

export default desktopBodySlice.reducer;
