import { TRegisterData } from '@api';
import userSlice, { initialState, registerThunk } from './index';
import { TUser } from '@utils-types';

const registerDataMock: TRegisterData = {
  email: 'user',
  name: 'user@yandex.ru',
  password: 'user'
};

const userMock: TUser = {
  email: 'user@yandex.ru',
  name: 'user'
};

describe('Тесты слайса пользователя', () => {
  describe('Тестирование асинхронной регистрации пользователя', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = registerThunk.pending('', registerDataMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.registerLoading).toBe(true);
      expect(state.registerError).toBeNull();
      expect(state.user).toEqual({
        name: '',
        email: ''
      });
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = registerThunk.fulfilled(userMock, '', registerDataMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.registerLoading).toBe(false);
      expect(state.registerError).toBeNull();
      expect(state.user).toEqual(userMock);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = registerThunk.rejected(
        error,
        'rejected',
        registerDataMock
      );

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.registerLoading).toBe(false);
      expect(state.registerError?.message).toEqual(error.message);
    });
  });
});
