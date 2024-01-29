import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps } from "types";

interface StateType {
  active: boolean;
  hide: boolean;
  favorites: Apps;
}

const initialState: StateType = {
  active: false,
  hide: false,
  favorites: [],
};

const dockSlice = createSlice({
  name: "dock",
  initialState,
  reducers: {
    setDockActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setDockHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setDockFavorites: (state, action: PayloadAction<Apps>) => {
      state.favorites = action.payload;
    },
  },
});

export const { setDockActive, setDockHide, setDockFavorites } =
  dockSlice.actions;

export default dockSlice.reducer;
