import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import ingredientsSlice, {
  getIngredientsThunk
} from '../../services/slices/ingredients';
import { useDispatch, useSelector } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredientsThunk());
  }, [dispatch]);

  /** TODO: взять переменные из стора */
  const isIngredientsLoading = useSelector(
    ingredientsSlice.selectors.getLoading
  );
  const ingredients = useSelector(ingredientsSlice.selectors.getIngredients);
  const error = useSelector(ingredientsSlice.selectors.getError);

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : error ? (
        <div className={`${styles.error} text text_type_main-medium pt-4`}>
          {error.message}
        </div>
      ) : ingredients.length > 0 ? (
        <ConstructorPage />
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
