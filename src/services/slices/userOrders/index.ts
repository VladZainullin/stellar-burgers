import { IOrdersState } from './type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

const initialState: IOrdersState = {
  orders: [],
  loading: false,
  error: null
};

const getUserOrdersThunk = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

const userOrdersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder.addCase(getUserOrdersThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserOrdersThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.orders = action.payload;
    });
    builder.addCase(getUserOrdersThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export { getUserOrdersThunk };
export default userOrdersSlice;
