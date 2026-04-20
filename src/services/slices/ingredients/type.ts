import { TIngredient } from '@utils-types';
import { SerializedError } from '@reduxjs/toolkit';

export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error: SerializedError | null;
}
