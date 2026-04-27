import { IBurgerState } from './type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 } from 'uuid';

const initialState: IBurgerState = {
  bun: null,
  ingredients: []
};

const burgerSlice = createSlice({
  name: 'burger',
  initialState: initialState,
  reducers: {
    add: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: v4() }
      })
    },
    remove(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.splice(state.ingredients.indexOf(action.payload), 1);
    },
    moveUp(state, action: PayloadAction<{ index: number }>) {
      const ingredient = state.ingredients[action.payload.index];
      state.ingredients[action.payload.index] =
        state.ingredients[action.payload.index - 1];
      state.ingredients[action.payload.index - 1] = ingredient;
    },
    moveDown(state, action: PayloadAction<{ index: number }>) {
      const ingredient = state.ingredients[action.payload.index];
      state.ingredients[action.payload.index] =
        state.ingredients[action.payload.index + 1];
      state.ingredients[action.payload.index + 1] = ingredient;
    },
    reset(state) {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {}
});

export default burgerSlice;
