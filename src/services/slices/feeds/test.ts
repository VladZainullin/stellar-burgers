import feedsSlice, { getFeedsThunk, getOrderThunk } from './index';
import { initialState } from './index';
import { TFeedsResponse } from '@api';

const ordersDataMock: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '844a6105c3D7580216fa083c',
      status: 'done',
      name: 'Татарский заказ',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: ['654a6505c3D7580216fa083c', '944a6105c3f7580216fa083c']
    }
  ],
  total: 1,
  totalToday: 1
};

describe('Тестирование слайса ленты заказов', () => {
  describe('Тестирование асинхронного получения ленты заказов', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = getFeedsThunk.pending('');

      // Act
      const state = feedsSlice.reducer(initialState, action);

      // Assert
      expect(state.orders).toHaveLength(0);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
      expect(state.getOrdersLoading).toBeTruthy();
      expect(state.getOrdersError).toBeNull();
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = getFeedsThunk.fulfilled(ordersDataMock, '');

      // Act
      const state = feedsSlice.reducer(initialState, action);

      // Assert
      expect(state.orders).toEqual(ordersDataMock.orders);
      expect(state.total).toEqual(ordersDataMock.total);
      expect(state.totalToday).toEqual(ordersDataMock.totalToday);
      expect(state.getOrdersLoading).toBeFalsy();
      expect(state.getOrdersError).toBeNull();
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = getFeedsThunk.rejected(error, '');

      // Act
      const state = feedsSlice.reducer(initialState, action);

      // Assert
      expect(state.orders).toHaveLength(0);
      expect(state.total).toBe(0);
      expect(state.totalToday).toBe(0);
      expect(state.getOrdersLoading).toBeFalsy();
      expect(state.getOrdersError?.message).toEqual(error.message);
    });
  });

  describe('Тестирование асинхронного получения заказа по номеру', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = getOrderThunk.pending('', ordersDataMock.orders[0].number);

      // Act
      const state = feedsSlice.reducer(initialState, action);

      // Assert
      expect(state.currentOrder).toBeNull();
      expect(state.getOrderLoading).toBeTruthy();
      expect(state.getOrderError).toBeNull();
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = getOrderThunk.fulfilled(
        ordersDataMock.orders[0],
        '',
        ordersDataMock.orders[0].number
      );

      // Act
      const state = feedsSlice.reducer(initialState, action);

      // Assert
      expect(state.currentOrder).toEqual(ordersDataMock.orders[0]);
      expect(state.getOrderLoading).toBeFalsy();
      expect(state.getOrderError).toBeNull();
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = getOrderThunk.rejected(error, '', 1);

      // Act
      const state = feedsSlice.reducer(initialState, action);

      // Assert
      expect(state.currentOrder).toBeNull();
      expect(state.getOrderLoading).toBeFalsy();
      expect(state.getOrderError?.message).toEqual(error.message);
    });
  });
});
