import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps } from "../../../../types";

interface StateType extends Apps {}

const initialState: StateType = {
  active: false,
  hide: false,
};

const calendarSlice = createSlice({
  name: "appsCalendar",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
  },
});

export const { setActive, setHide } = calendarSlice.actions;

export default calendarSlice.reducer;
