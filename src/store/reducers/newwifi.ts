import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  name: string;
  security:
    | "None"
    | "WEP"
    | "WPA"
    | "WPA2"
    | "WPA Enterprise"
    | "WPA2 Enterprise"
    | "WPA3 Enterprise";
}

const initialState: StateType = {
  active: false,
  name: "",
  security: "WPA2",
};

export const wpSlice = createSlice({
  name: "newwifi",
  initialState,
  reducers: {
    toggleActive: (state, action) => {
      state.active = action.payload;
    },
    setWifiName: (state, action) => {
      state.name = action.payload;
    },
    setSecurity: (state, action) => {
      state.security = action.payload;
    },
    setInactive: (state) => {
      state.active = false;
      state.name = "";
      state.security = "None";
    },
  },
});

export const { toggleActive, setSecurity, setWifiName, setInactive } =
  wpSlice.actions;

export default wpSlice.reducer;
