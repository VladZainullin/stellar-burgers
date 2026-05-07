import store, { rootReducer } from './store';

describe('Тестирование корневого reducer', () => {
  test('Тестирование применение невалидного экшена к корневому reducer', () => {
    // Arrange
    const initialState = store.getState();
    const action = {
      type: 'TEST_ACTION'
    };

    // Act
    const state = rootReducer(undefined, action);

    // Assert
    expect(state).toEqual(initialState);
  });
});
