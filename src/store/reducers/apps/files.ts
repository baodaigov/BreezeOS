import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Apps } from 'types';

interface StateType extends Apps {
  directory: string;
  iconSize: number;
}

const initialState: StateType = {
  active: false,
  hide: false,
  directory: '/home',
  iconSize: 70,
};

const filesSlice = createSlice({
  name: 'appsFiles',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setDirectory: (state, action: PayloadAction<string>) => {
      state.directory = action.payload;
    },
    setIconSize: (state, action: PayloadAction<number>) => {
      state.iconSize = action.payload;
    },
  },
});

export const { setActive, setHide, setDirectory, setIconSize } =
  filesSlice.actions;

export default filesSlice.reducer;
