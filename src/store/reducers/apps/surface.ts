import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Apps } from "../../../../types";

interface StateType extends Apps {
  private: boolean;
}

const initialState: StateType = {
  active: false,
  hide: false,
  private: false,
};

const appsSurfaceSlice = createSlice({
  name: "appsSurface",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setPrivate: (state, action: PayloadAction<boolean>) => {
      state.private = action.payload;
    },
  },
});

export const { setActive, setHide, setPrivate } = appsSurfaceSlice.actions;

export default appsSurfaceSlice.reducer;
