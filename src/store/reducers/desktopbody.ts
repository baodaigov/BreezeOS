import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  hide: boolean;
}

const initialState: StateType = {
  active: false,
  hide: false,
};

const desktopBodySlice = createSlice({
  name: "desktopbody",
  initialState,
  reducers: {
    setDesktopBodyActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setDesktopBodyHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
  },
});

export const { setDesktopBodyActive, setDesktopBodyHide } =
  desktopBodySlice.actions;

export default desktopBodySlice.reducer;
