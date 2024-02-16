import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности (убыв)',
        sortProperty: 'rating'
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSortType(state, action) {
            state.sort = action.payload
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload
        },
        setFilters(state, action) {
            state.currentPage = +action.payload.currentPage;
            state.sort = action.payload.sort;
            state.categoryId = +action.payload.categoryId;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        }
    }
})

export const selectFilter = state => state.filter
export const selectSort = state => state.filter.sort

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;