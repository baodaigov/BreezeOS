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
            document.getElementsByClassName('imgview')[0].classList.add('active');
        }
    }
});

export const {openPic} = imgViewSlice.actions;

export default imgViewSlice.reducer;