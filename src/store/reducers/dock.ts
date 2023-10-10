import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  hide: boolean;
}

const initialState: StateType = {
  active: false,
  hide: false,
};

const dockSlice = createSlice({
  name: "dock",
  initialState,
  reducers: {
    setDockActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setDockHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
  },
});

export const { setDockActive, setDockHide } = dockSlice.actions;

export default dockSlice.reducer;
