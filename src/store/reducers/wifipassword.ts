import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  active: boolean;
  passwordFor: string;
  value: string;
  disabled: boolean;
  isShow: boolean;
  isWrong: boolean;
}

const initialState: StateType = {
  active: false,
  passwordFor: "",
  value: "",
  disabled: false,
  isShow: false,
  isWrong: false,
};

export const wpSlice = createSlice({
  name: "wifipassword",
  initialState,
  reducers: {
    insertPasswordFor: (state, action: PayloadAction<string>) => {
      state.passwordFor = action.payload;
      state.active = true;
    },
    cancelPassword: (state) => {
      state.active = false;
      state.value = "";
      state.isWrong = false;
    },
    setInputPassword: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setPasswordDisable: (state, action: PayloadAction<boolean>) => {
      state.disabled = action.payload;
    },
    displayPassword: (state, action: PayloadAction<boolean>) => {
      state.isShow = action.payload;
    },
    setWrongPassword: (state, action: PayloadAction<boolean>) => {
      state.isWrong = action.payload;
    },
  },
});

export const {
  insertPasswordFor,
  cancelPassword,
  setInputPassword,
  setPasswordDisable,
  displayPassword,
  setWrongPassword,
} = wpSlice.actions;

export default wpSlice.reducer;
