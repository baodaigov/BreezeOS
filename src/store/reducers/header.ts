import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  hide: boolean;
  type: string;
  width: number;
  proMode: boolean;
}

const initialState: StateType = {
  active: false,
  hide: false,
  type: "default",
  width: 900,
  proMode: true,
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setHeaderActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setHeaderHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setHeaderType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setProMode: (state, action: PayloadAction<boolean>) => {
      state.proMode = action.payload;
    },
  },
});

export const {
  setHeaderActive,
  setHeaderHide,
  setHeaderType,
  setWidth,
  setProMode,
} = headerSlice.actions;

export default headerSlice.reducer;
