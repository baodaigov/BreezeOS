import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  charging: boolean;
}

const initialState: StateType = {
  charging: false,
};

const batterySlice = createSlice({
  name: "battery",
  initialState,
  reducers: {
    setCharging: (state, action: PayloadAction<boolean>) => {
      state.charging = action.payload;
    },
  },
});

export const { setCharging } = batterySlice.actions;

export default batterySlice.reducer;
