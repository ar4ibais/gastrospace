import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import foods from './slices/foodsSlice'

export const store = configureStore({
    devTools: true,
    reducer: {
        filter,
        cart,
        foods
    },
})