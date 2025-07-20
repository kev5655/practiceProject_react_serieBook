import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth-slice.ts';
import seriesSlice from './series-slice';
import uiSlice from './ui-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        series: seriesSlice.reducer,
        ui: uiSlice.reducer,
    },
    // Adding middleware and devTools configuration for Redux 5
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types for serializability checks
                ignoredActions: ['auth/login/fulfilled', 'auth/signup/fulfilled'],
            },
        }),
    // Use environment mode for devTools configuration
    devTools: true, // Set to false in production
});

// Export the store as default
export default store;

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
