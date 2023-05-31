import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pic: ''
}

const imgViewSlice = createSlice({
    name: 'imgView',
    initialState,
    reducers: {
        openPic: (state, action) => {
            state.pic = action.payload;
            setTimeout(() => document.getElementsByClassName('imgview')[0].classList.add('active'), 100);
        }
    }
});

export const {openPic} = imgViewSlice.actions;

export default imgViewSlice.reducer;