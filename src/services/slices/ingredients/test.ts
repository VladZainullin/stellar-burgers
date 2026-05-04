import ingredientsSlice, { getIngredientsThunk, initialState } from './index';

const ingredientsMockData = [
  {
    _id: '844a6105c3D7580216fa083c',
    name: 'Татарская булка',
    type: 'bun',
    proteins: 10,
    fat: 40,
    carbohydrates: 50,
    calories: 900,
    price: 230,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0
  }
];

describe('Тестирование слайса ингредиентов', () => {
  describe('Тестирование асинхронного получения ингредиентов', () => {
    test('В состоянии <Pending>', () => {
      // Arrange
      const action = getIngredientsThunk.pending('');

      // Act
      const state = ingredientsSlice.reducer(initialState, action);

      // Assert
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });

    test('В состоянии <Fullfilled>', () => {
      // Arrange
      const action = getIngredientsThunk.fulfilled(ingredientsMockData, '');

      // Act
      const state = ingredientsSlice.reducer(initialState, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.ingredients).toEqual(ingredientsMockData);
    });

    test('В состоянии <Rejected>', () => {
      // Arrange
      const error = new Error('Тестовая ошибка');
      const action = getIngredientsThunk.rejected(error, '');

      // Act
      const state = ingredientsSlice.reducer(initialState, action);

      // Assert
      expect(state.loading).toBe(false);
      expect(state.error?.message).toEqual(error.message);
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
