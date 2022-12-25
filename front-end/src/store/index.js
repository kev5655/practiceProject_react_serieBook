import { configureStore } from '@reduxjs/toolkit';

import seriesSlice from './series-slice'
import authenticateSlice from "./authenticate-slice";
import uiSlice from "./ui-slice";


const store = configureStore({
    reducer: {series: seriesSlice.reducer,
        auth: authenticateSlice.reducer,
        ui: uiSlice.reducer },
});

export default store;