import { IFeedState } from './type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: true,
  error: null
};

const getFeedsThunk = createAsyncThunk(
  'feeds/getOrders',
  async () => await getFeedsApi()
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  reducers: {},
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeedsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export { getFeedsThunk };
export default feedsSlice;
