import { TOrder } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: SerializedError | null;
}
