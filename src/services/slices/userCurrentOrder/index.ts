import { IUserCurrentOrderState } from './type';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

const initialState: IUserCurrentOrderState = {
  error: null,
  loading: false,
  order: null
};

const getOrderThunk = createAsyncThunk<TOrder, number>(
  'orders/getOrder',
  async (number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const userCurrentOrderSlice = createSlice({
  name: 'userCurrentOrder',
  initialState: initialState,
  reducers: {
    remove(state) {
      state.order = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getLoading: (state) => state.loading,
    getError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getOrderThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.order = action.payload;
    });
    builder.addCase(getOrderThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export { getOrderThunk };
export default userCurrentOrderSlice;
