import { rootReducer, RootState } from './store';
import { initialState as userInitialState } from './slices/user';
import { initialState as ingredientsInitialState } from './slices/ingredients';
import { initialState as feedsInitialState } from './slices/feeds';
import { initialState as burgerFeedsInitialState } from './slices/burger';

describe('Тестирование корневого reducer', () => {
  test('Тестирование применение невалидного экшена к корневому reducer', () => {
    // Arrange
    const initialState: RootState = {
      user: userInitialState,
      ingredients: ingredientsInitialState,
      feeds: feedsInitialState,
      burger: burgerFeedsInitialState
    };
    const action = {
      type: 'UNKNOWN_ACTION'
    };

    // Act
    const state = rootReducer(undefined, action);

    // Assert
    expect(state).toEqual(initialState);
  });
});
