import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps } from "../../../../types";

interface StateType extends Apps {}

const initialState: StateType = {
  active: false,
  hide: false,
};

const softwareStoreSlice = createSlice({
  name: "appsSoftwareStore",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
      state.hide = false;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
  },
});

export const { setActive, setHide } = softwareStoreSlice.actions;

export default softwareStoreSlice.reducer;
