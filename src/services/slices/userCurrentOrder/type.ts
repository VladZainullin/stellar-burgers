import { SerializedError } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface IUserCurrentOrderState {
  order: TOrder | null;
  loading: boolean;
  error: SerializedError | null;
}
