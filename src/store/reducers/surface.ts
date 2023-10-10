import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  url: string;
}

const initialState: StateType = {
  url: "",
};

const surfaceSlice = createSlice({
  name: "surface",
  initialState,
  reducers: {
    openUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    closeUrl: (state) => {
      state.url = "";
    },
  },
});

export const { openUrl, closeUrl } = surfaceSlice.actions;

export default surfaceSlice.reducer;
