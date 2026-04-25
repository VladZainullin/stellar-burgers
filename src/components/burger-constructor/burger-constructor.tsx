import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import feedsSlice, { createOrderThunk } from '../../services/slices/feeds';
import { useNavigate } from 'react-router-dom';
import userSlice from '../../services/slices/user';
import burgerSlice from '../../services/slices/burger';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ingredients = useSelector((state) => state.burger.ingredients);
  const bun = useSelector((state) => state.burger.bun);

  const orderRequest = useSelector(feedsSlice.selectors.createOrderLoading);

  const orderModalData = useSelector(feedsSlice.selectors.getCurrentOrder);

  const isAuthenticated = useSelector(userSlice.selectors.getIsAuthenticated);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!isAuthenticated) {
      return navigate('/login');
    }

    const data = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrderThunk(data)).then(() => {
      dispatch(burgerSlice.actions.reset());
    });
  };
  const closeOrderModal = () => {
    dispatch(feedsSlice.actions.removeCurrentOrder());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={{
        bun: bun,
        ingredients: ingredients
      }}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
