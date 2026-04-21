import { FC } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import ingredientsSlice from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const ingredientData = useSelector(
    ingredientsSlice.selectors.getIngredients
  ).find((i) => i._id === ingredientId);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
