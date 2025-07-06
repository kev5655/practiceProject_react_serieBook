import {createSlice} from "@reduxjs/toolkit";
import {SORT_PARAMS} from "../components/app/seriePanel/FilterAndSort";


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
        sortParam: SORT_PARAMS.BY_LAST_MODIFIED,
        totalQuantity: 0,
    },
    reducers: {
        loadSeries(state, action) {
            state.items = action.payload.series
            state.filteredItems = action.payload.series
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
        },
        updateSortParam(state, action) {
            state.sortParam = action.payload.sortParam;
        }
    }
})

export const seriesAction = seriesSlice.actions;

export default seriesSlice;