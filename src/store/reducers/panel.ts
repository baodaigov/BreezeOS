import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  type: string;
}

const initialState: StateType = {
  active: false,
  type: "",
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    activePanel: (state) => {
      state.active = true;
      state.type = "default";
    },
    inactivePanel: (state) => {
      state.active = false;
      state.type = "";
    },
    switchType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const { activePanel, inactivePanel, switchType } = panelSlice.actions;

export default panelSlice.reducer;
