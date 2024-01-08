import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateType {
  widgets: string[];
}

const initialState: StateType = {
  widgets: ['clock'],
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setWidgets: (state, action: PayloadAction<string[]>) => {
      state.widgets = action.payload;
    },
  },
});

export const { setWidgets } = widgetSlice.actions;

export default widgetSlice.reducer;
