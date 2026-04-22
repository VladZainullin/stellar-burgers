import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '@ui';
import { OrderInfoUI } from '@ui';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import ingredientsSlice from '../../services/slices/ingredients';
import { useParams } from 'react-router-dom';
import feedsSlice, { getOrderThunk } from '../../services/slices/feeds';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const number = Number(orderNumber);

  useEffect(() => {
    dispatch(getOrderThunk(number));
  }, [dispatch, number]);

  const orderData = useSelector(feedsSlice.selectors.getCurrentOrder);

  const ingredients: TIngredient[] = useSelector(
    ingredientsSlice.selectors.getIngredients
  );

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
