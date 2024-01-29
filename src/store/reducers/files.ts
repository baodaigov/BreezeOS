import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  directory: string;
  iconSize: number;
}

const initialState: StateType = {
  directory: "/home",
  iconSize: 70,
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setDirectory: (state, action: PayloadAction<string>) => {
      state.directory = action.payload;
    },
    setIconSize: (state, action: PayloadAction<number>) => {
      state.iconSize = action.payload;
    },
  },
});

export const { setDirectory, setIconSize } = filesSlice.actions;

export default filesSlice.reducer;
