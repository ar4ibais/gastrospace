import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import foods from './slices/foodsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
	devTools: true,
	reducer: {
		filter,
		cart,
		foods,
	},
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
