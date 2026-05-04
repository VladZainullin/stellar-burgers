import { TLoginData, TRegisterData } from '@api';
import userSlice, { initialState, loginThunk, registerThunk } from './index';
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

const loginDataMock: TLoginData = {
  email: 'user@yandex.ru',
  password: 'user'
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
      const action = registerThunk.rejected(error, '', registerDataMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.registerLoading).toBe(false);
      expect(state.registerError?.message).toEqual(error.message);
    });
  });

  describe('Тестирование логина пользователя', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = loginThunk.pending('', loginDataMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.loginLoading).toBe(true);
      expect(state.loginError).toBeNull();
      expect(state.user).toEqual({
        name: '',
        email: ''
      });
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = loginThunk.fulfilled(userMock, '', loginDataMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.loginLoading).toBe(false);
      expect(state.loginError).toBeNull();
      expect(state.user).toEqual(userMock);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = loginThunk.rejected(error, '', loginDataMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.loginLoading).toBe(false);
      expect(state.loginError?.message).toEqual(error.message);
    });
  });
});
