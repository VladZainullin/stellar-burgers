import { TUser } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export interface IUserState {
  user: TUser | null;
  loginLoading: boolean;
  loginError: SerializedError | null;
  registerLoading: boolean;
  registerError: SerializedError | null;
  logoutLoading: boolean;
  logoutError: SerializedError | null;
  getUserLoading: boolean;
  getUserError: SerializedError | null;
  updateUserLoading: boolean;
  updateUserError: SerializedError | null;
}
