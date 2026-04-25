import { IFeedState } from './type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

const initialState: IFeedState = {
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
  getOrdersLoading: false,
  getOrdersError: null,
  getOrderLoading: false,
  getOrderError: null
};

const getFeedsThunk = createAsyncThunk(
  'feeds/getOrders',
  async () => await getFeedsApi()
);

const getOrderThunk = createAsyncThunk<TOrder, number>(
  'orders/getOrder',
  async (number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState: initialState,
  reducers: {
    removeCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getCurrentOrder: (state) => state.currentOrder,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday,
    getOrdersLoading: (state) => state.getOrdersLoading,
    getOrdersError: (state) => state.getOrdersError
  },
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.getOrdersLoading = true;
      state.getOrdersError = null;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, action) => {
      state.getOrdersLoading = false;
      state.getOrdersError = null;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeedsThunk.rejected, (state, action) => {
      state.getOrdersLoading = false;
      state.getOrdersError = action.error;
    });

    builder.addCase(getOrderThunk.pending, (state) => {
      state.getOrderLoading = true;
      state.getOrderError = null;
    });
    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.getOrderLoading = false;
      state.getOrderError = null;
      state.currentOrder = action.payload;
    });
    builder.addCase(getOrderThunk.rejected, (state, action) => {
      state.getOrderLoading = false;
      state.getOrderError = action.error;
    });
  }
});

export { getFeedsThunk, getOrderThunk };
export default feedsSlice;
