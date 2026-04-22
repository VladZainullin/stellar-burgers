import { IConstructorState } from './type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { v4 } from 'uuid';

const initialState: IConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: initialState,
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type !== 'bun') return;

      state.bun = action.payload;
    },
    add(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') return;

      action.payload._id = v4();
      state.ingredients.push(action.payload);
    },
    remove(state, action: PayloadAction<TIngredient>) {
      state.ingredients.splice(state.ingredients.indexOf(action.payload), 1);
    },
    reset(state) {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {}
});

export default constructorSlice;
