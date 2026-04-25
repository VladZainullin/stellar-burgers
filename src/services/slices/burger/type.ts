import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IBurgerState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}
