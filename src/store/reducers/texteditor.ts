import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  location: string;
}

const initialState: StateType = {
  location: "",
};

const textEditorSlice = createSlice({
  name: "texteditor",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = textEditorSlice.actions;

export default textEditorSlice.reducer;
