import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type MsgBoxType = 'critical' | 'exclamation' | 'question' | 'information';
type MsgBoxButtons = {
  label: string;
  action?: React.MouseEventHandler<HTMLDivElement>;
}[];
type MsgBox = {
  type?: MsgBoxType;
  title?: string;
  content?: string;
  buttons: MsgBoxButtons;
  topBarTitle?: string;
  width?: string;
  icon?: string;
}[];

interface StateType {
  blocks: MsgBox;
}

const initialState: StateType = {
  blocks: [],
};

const msgboxSlice = createSlice({
  name: 'msgbox',
  initialState,
  reducers: {
    setBlocks: (state, action: PayloadAction<MsgBox>) => {
      state.blocks = action.payload;
    },
    clearBlocks: (state) => {
      state.blocks = [];
    },
  },
});

export const { setBlocks, clearBlocks } = msgboxSlice.actions;

export default msgboxSlice.reducer;
