import { configureStore } from '@reduxjs/toolkit';

import seriesSlice from './series-slice'
import authenticateSlice from "./authenticate-slice";


const store = configureStore({
    reducer: {series: seriesSlice.reducer,
        auth: authenticateSlice.reducer },
});

export default store;