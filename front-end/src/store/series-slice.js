import {createSlice} from "@reduxjs/toolkit";


const INIT_SERIE = {
    id: '',
    title: '',
    episode: '',
    session: '',
    stars: '',
    startDate: '',
    endDate: '',
    createdDate: '',
    lastModifiedDate: ''
}

const seriesSlice = createSlice({
    name: 'series',
    initialState: {
        items: [],
        filteredItems: [],
        selectSerie: INIT_SERIE,
        totalQuantity: 0,
    },
    reducers: {
        loadSeries(state, action) {
            state.items = action.payload.series
            state.totalQuantity = action.payload.series.length
        },
        disselect(state) {
            state.selectSerie = INIT_SERIE;
        },
        selectSerie(state, action) {
            state.selectSerie = action.payload.serie;
        },
        updateFilteredSerie(state, action) {
            state.filteredItems = action.payload.series;
        },
        updateAllItems(state, action){
            state.items = action.payload.series;
            state.filteredItems = action.payload.filteredSeries;
        }
    }
})

export const seriesAction = seriesSlice.actions;

export default seriesSlice;