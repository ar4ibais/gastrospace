import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchFoods = createAsyncThunk(
    'foods/fetchFoodsStatus',
    async (
        {
            order,
            sortBy,
            category,
            search,
            currentPage
        }
    ) => {
        const { data } = await axios.get(`https://65bd1a6db51f9b29e932ed9f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data
    },
)


const initialState = {
    items: [],
    status: 'loading'
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
        builder.addCase(fetchFoods.pending, (state) => {
            state.status = 'loading'
            state.items = []
        })
        builder.addCase(fetchFoods.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = 'success'
        })
        builder.addCase(fetchFoods.rejected, (state, action) => {
            state.status = 'error'
            state.items = []
        })
    }
})

export const { setItems } = foodsSlice.actions;
export default foodsSlice.reducer 