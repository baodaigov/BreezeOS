import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
};

const surfaceSlice = createSlice({
  name: "surface",
  initialState,
  reducers: {
    openUrl: (state, action) => {
      state.url = action.payload;
    },
    closeUrl: (state) => {
      state.url = "";
    },
  },
});

export const { openUrl, closeUrl } = surfaceSlice.actions;

export default surfaceSlice.reducer;
