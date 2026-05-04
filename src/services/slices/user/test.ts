import { TLoginData, TRegisterData } from '@api';
import userSlice, {
  getUserOrdersThunk,
  getUserThunk,
  initialState,
  loginThunk,
  logoutThunk,
  registerThunk,
  updateUserThunk
} from './index';
import { TOrder, TUser } from '@utils-types';

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

describe('Тестирование слайса пользователя', () => {
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

  describe('Тестирование асинхронного входа пользователя', () => {
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

  describe('Тестирование асинхронного выхода пользователя', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = logoutThunk.pending('');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.logoutLoading).toBe(true);
      expect(state.logoutError).toBeNull();
      expect(state.user).toEqual({
        name: '',
        email: ''
      });
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = logoutThunk.fulfilled(undefined, '');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.logoutLoading).toBe(false);
      expect(state.logoutError).toBeNull();
      expect(state.user).toEqual(initialState.user);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = logoutThunk.rejected(error, '');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.logoutLoading).toBe(false);
      expect(state.logoutError?.message).toEqual(error.message);
    });
  });

  describe('Тестирование асинхронного получения пользователя', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = getUserThunk.pending('');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.getUserLoading).toBe(true);
      expect(state.getUserError).toBeNull();
      expect(state.user).toEqual({
        name: '',
        email: ''
      });
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = getUserThunk.fulfilled(userMock, '');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.getUserLoading).toBe(false);
      expect(state.getUserError).toBeNull();
      expect(state.user).toEqual(userMock);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = getUserThunk.rejected(error, '');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.getUserLoading).toBe(false);
      expect(state.getUserError?.message).toEqual(error.message);
    });
  });

  describe('Тестирование асинхронного получения заказов пользователя', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = getUserOrdersThunk.pending('');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.getOrdersLoading).toBe(true);
      expect(state.getOrdersError).toBeNull();
      expect(state.orders).toHaveLength(0);
    });

    test('В состоянии <Fullfilled>', () => {
      const ordersMockData: TOrder[] = [
        {
          ingredients: [
            '9733a9a5c3f9b9001cfa093d',
            '9733a9a5c3f7b9051cfa0941',
            '9733a9a5c3f7b9101cfa093d'
          ],
          _id: '98321a23450ee4ee1d09c6b5',
          status: 'done',
          name: 'Тестовый заказ',
          createdAt: '2026-05-04T21:28:53.041Z',
          updatedAt: '2026-05-04T21:28:58.011Z',
          number: 129765
        }
      ];

      // Arrange
      const action = getUserOrdersThunk.fulfilled(ordersMockData, '');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.getOrdersLoading).toBe(false);
      expect(state.getOrdersError).toBeNull();
      expect(state.orders).toEqual(ordersMockData);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = getUserOrdersThunk.rejected(error, '');

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.getOrdersLoading).toBe(false);
      expect(state.getOrdersError?.message).toEqual(error.message);
      expect(state.orders).toHaveLength(0);
    });
  });

  describe('Тестирование асинхронного обновления пользователя', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = updateUserThunk.pending('', userMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.updateUserLoading).toBe(true);
      expect(state.updateUserError).toBeNull();
      expect(state.user).toEqual(initialState.user);
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = updateUserThunk.fulfilled(userMock, '', userMock);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.updateUserLoading).toBe(false);
      expect(state.updateUserError).toBeNull();
      expect(state.user).toEqual(userMock);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = updateUserThunk.rejected(error, '', initialState.user);

      // Act
      const state = userSlice.reducer(initialState, action);

      // Assert
      expect(state.updateUserLoading).toBe(false);
      expect(state.updateUserError?.message).toEqual(error.message);
      expect(state.user).toEqual(initialState.user);
    });
  });
});
