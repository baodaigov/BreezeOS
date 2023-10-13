import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  location: string;
  pic: string | undefined;
}

const initialState: StateType = {
  location: "",
  pic: "",
};

const imgViewSlice = createSlice({
  name: "imgView",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    openPic: (state, action: PayloadAction<string | undefined>) => {
      state.pic = action.payload;
    },
  },
});

export const { setLocation, openPic } = imgViewSlice.actions;

export default imgViewSlice.reducer;
