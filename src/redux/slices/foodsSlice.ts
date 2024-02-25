import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

type Food = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

interface FoodSliceState {
	items: Food[];
	status: Status;
}

export const fetchFoods = createAsyncThunk(
	'foods/fetchFoodsStatus',
	async ({ order, sortBy, category, search, currentPage }: Record<string, string>) => {
		const { data } = await axios.get(
			`https://65bd1a6db51f9b29e932ed9f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);
		return data as Food[];
	},
);

const initialState: FoodSliceState = {
	items: [],
	status: Status.LOADING,
};

const foodsSlice = createSlice({
	name: 'foods',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFoods.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchFoods.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchFoods.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
});

export const selectFoods = (state: RootState) => state.foods;

export const { setItems } = foodsSlice.actions;
export default foodsSlice.reducer;
