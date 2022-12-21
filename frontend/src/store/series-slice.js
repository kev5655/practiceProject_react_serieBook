import {createSlice} from "@reduxjs/toolkit";
import {SORT_PARAMS} from "../components/app/seriePanel/FilterAndSort";
import {sortSeries} from "./series-action";



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
            //state.filteredItems = action.payload.items
            state.totalQuantity = action.payload.items.length
        },
        addSerie(state, action) {

        },
        removeSerie(state, action){

        },
        selectSerie(state, action){

        },
        updateSerie(state, action){
            state.filteredItems = action.payload.series;
        }
    }
})

export const seriesAction = seriesSlice.actions;

export default seriesSlice;