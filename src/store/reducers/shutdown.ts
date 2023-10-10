import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  elem: React.ReactElement[];
}

const initialState: StateType = {
  elem: [],
};

export const shutdownSlice = createSlice({
  name: "shutdown",
  initialState,
  reducers: {
    pushItem: (state, action: PayloadAction<React.ReactElement>) => {
      state.elem = [...state.elem, action.payload];
    },

    clearItem: (state) => {
      state.elem = [];
    },
  },
});

export const { pushItem, clearItem } = shutdownSlice.actions;

export default shutdownSlice.reducer;
