import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps } from "../../../../types";

interface StateType extends Apps {
  settings: string;
}

const initialState: StateType = {
  active: false,
  hide: false,
  settings: "Wi-Fi",
};

const settingsSlice = createSlice({
  name: "appsSettings",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
      state.hide = false;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setSettings: (state, action: PayloadAction<string>) => {
      state.settings = action.payload;
    },
  },
});

export const { setActive, setHide, setSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
