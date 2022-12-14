import {createSlice} from "@reduxjs/toolkit";


const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        items: [],
        filteredItems: [],
        selectSerie: null,
        totalQuantity: 0,
    },
    reducers: {
        loadSerie(state, action){
            state.items = action.payload.items
            state.filteredItems = action.payload.items
            state.totalQuantity = action.payload.items.length
        },
        addSerie(state, action) {

        },
        removeSerie(state, action){

        },
        selectSerie(state, action){

        },
        updateSerie(state, action){

        },
        sortSeries(state, action) {

        },
        filterSerie(state, action) {

        }
    }
})

export const seriesAction = seriesSlice.actions;

export default seriesSlice;