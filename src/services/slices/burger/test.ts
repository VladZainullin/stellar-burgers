import burgerSlice, { initialState } from './index';
import { TConstructorIngredient } from '@utils-types';
import { IBurgerState } from './type';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '844a6105c3D7580216fa083c')
}));

describe('Тестирование слайса конструктора бургера', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Тестирование функции изменения булки бургера', () => {
    // Arrange
    const bun: TConstructorIngredient = {
      id: '844a6105c3D7580216fa083c',
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
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };
    const action = burgerSlice.actions.add(bun);

    // Act
    const state = burgerSlice.reducer(initialState, action);

    // Assert
    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toHaveLength(0);
  });

  test('Тестирование функции изменения начинки бургера', () => {
    // Arrange
    const bun: TConstructorIngredient = {
      id: '844a6105c3D7580216fa083c',
      _id: '844a6105c3D7580216fa083c',
      name: 'Татарская начинка',
      type: 'main',
      proteins: 10,
      fat: 40,
      carbohydrates: 50,
      calories: 900,
      price: 230,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };
    const action = burgerSlice.actions.add(bun);

    // Act
    const state = burgerSlice.reducer(initialState, action);

    // Assert
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(bun);
  });

  test('Тестирование удаления начинки из бургера', () => {
    // Arrange
    const initialStateWithIngredient: IBurgerState = {
      bun: null,
      ingredients: [
        {
          id: '844a6105c3D7580216fa083c',
          _id: '844a6105c3D7580216fa083c',
          name: 'Татарская начинка',
          type: 'main',
          proteins: 10,
          fat: 40,
          carbohydrates: 50,
          calories: 900,
          price: 230,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ]
    };
    const action = burgerSlice.actions.remove(
      initialStateWithIngredient.ingredients[0]
    );

    // Act
    const state = burgerSlice.reducer(initialStateWithIngredient, action);

    // Assert
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  test('Тестирование очистки содержимого бургера', () => {
    // Arrange
    const initialStateWithIngredient: IBurgerState = {
      bun: {
        _id: '844a6105c3D7580216fa083c',
        name: 'Татарская булка',
        type: 'main',
        proteins: 10,
        fat: 40,
        carbohydrates: 50,
        calories: 900,
        price: 230,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      },
      ingredients: [
        {
          id: '844a6105c3D7580216fa083c',
          _id: '844a6105c3D7580216fa083c',
          name: 'Татарская начинка',
          type: 'main',
          proteins: 10,
          fat: 40,
          carbohydrates: 50,
          calories: 900,
          price: 230,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ]
    };
    const action = burgerSlice.actions.reset();

    // Act
    const state = burgerSlice.reducer(initialStateWithIngredient, action);

    // Assert
    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });

  test('Тестирование изменения порядка ингредиентов в бургере', () => {
    // Arrange
    const initialStateWithIngredients: IBurgerState = {
      bun: {
        _id: '844a6105c3D7580216fa083c',
        name: 'Татарская булка',
        type: 'main',
        proteins: 10,
        fat: 40,
        carbohydrates: 50,
        calories: 900,
        price: 230,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
      },
      ingredients: [
        {
          id: '844a6105c3D7580216fa083c',
          _id: '844a6105c3D7580216fa083c',
          name: 'Татарская начинка',
          type: 'main',
          proteins: 10,
          fat: 40,
          carbohydrates: 50,
          calories: 900,
          price: 230,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        },
        {
          id: '846a6105c3D7580216fa083c',
          _id: '834a6105c3D7580216fa083c',
          name: 'Татарский соус',
          type: 'sauce',
          proteins: 10,
          fat: 40,
          carbohydrates: 50,
          calories: 900,
          price: 230,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
        }
      ]
    };
    const action = burgerSlice.actions.moveUp({
      index: 1
    });

    // Act
    const state = burgerSlice.reducer(initialStateWithIngredients, action);

    // Assert
    expect(state.ingredients[0]).toEqual(
      initialStateWithIngredients.ingredients[1]
    );
  });
});
