import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchFoods = createAsyncThunk(
    'foods/fetchFoodsStatus',
    async (params) => {
        const {
            order,
            sortBy,
            category,
            search,
            currentPage
        } = params;
        const { data } = await axios.get(`https://65bd1a6db51f9b29e932ed9f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)

        return data
    },
)

const initialState = {
    items: []
}

const foodsSlice = createSlice({
    name: 'foods',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFoods.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})

export const { setItems } = foodsSlice.actions;
export default foodsSlice.reducer 