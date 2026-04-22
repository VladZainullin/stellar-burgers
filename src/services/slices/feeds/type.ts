import { TOrder } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export interface IFeedState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  total: number;
  totalToday: number;
  getOrdersLoading: boolean;
  getOrdersError: SerializedError | null;
  getOrderLoading: boolean;
  getOrderError: SerializedError | null;
}
