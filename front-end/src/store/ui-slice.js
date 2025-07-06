import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isSerieListBlur: false,
    },
    reducers: {
        enableBlurSerieList(state) {
            state.isSerieListBlur = true;
        },
        disableBlurSerieList(state) {
            state.isSerieListBlur = false;
        }
    }
})

export const uiAction = uiSlice.actions;

export default uiSlice;