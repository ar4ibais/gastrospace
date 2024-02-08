import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, accum) => sum + accum.price * accum.count, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem && findItem.count > 1) {
                findItem.count--
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
        },
        clearItems() {
            return initialState
        }
    }
})

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer 