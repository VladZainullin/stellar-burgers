import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}
