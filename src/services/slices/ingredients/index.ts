import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { IIngredientsState } from './type';
import { getIngredientsApi } from '@api';

const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: null
};

const getIngredientsThunk = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    getIngredients: (state: IIngredientsState) => state.ingredients,
    getBuns: createSelector(
      (state: IIngredientsState) => state.ingredients,
      (ingredients) => ingredients.filter((i) => i.type === 'bun')
    ),
    getMains: createSelector(
      (state: IIngredientsState) => state.ingredients,
      (ingredients) => ingredients.filter((i) => i.type === 'main')
    ),
    getSauces: createSelector(
      (state: IIngredientsState) => state.ingredients,
      (ingredients) => ingredients.filter((i) => i.type === 'sauce')
    ),
    getError: (state) => state.error,
    getLoading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredientsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getIngredientsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.ingredients = action.payload;
    });
    builder.addCase(getIngredientsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export { initialState };
export { getIngredientsThunk };
export default ingredientsSlice;
