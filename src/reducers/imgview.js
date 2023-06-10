import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location: '',
    pic: ''
}

const imgViewSlice = createSlice({
    name: 'imgView',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        openPic: (state, action) => {
            state.pic = action.payload;
            setTimeout(() => document.getElementsByClassName('imgview')[0].classList.add('active'), 100);
        }
    }
});

export const {setLocation,openPic} = imgViewSlice.actions;

export default imgViewSlice.reducer;