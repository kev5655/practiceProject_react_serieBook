

// Export hooks for typed Redux usage
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import store, { AppDispatch, RootState } from './store.ts';

// Define typed versions of useDispatch and useSelector hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Export the store as the default
export default store;
