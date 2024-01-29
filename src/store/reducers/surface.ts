import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  searchEngine: string;
  private: boolean;
}

const initialState: StateType = {
  searchEngine: "Google",
  private: false,
};

const surfaceSlice = createSlice({
  name: "surface",
  initialState,
  reducers: {
    setSearchEngine: (state, action: PayloadAction<string>) => {
      state.searchEngine = action.payload;
    },
    setPrivate: (state, action: PayloadAction<boolean>) => {
      state.private = action.payload;
    },
  },
});

export const { setSearchEngine, setPrivate } = surfaceSlice.actions;

export default surfaceSlice.reducer;
