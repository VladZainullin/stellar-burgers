import { TOrder } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export interface IOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: SerializedError | null;
}
