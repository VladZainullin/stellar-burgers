import { Feed, NotFound404 } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import ingredientsSlice, {
  getIngredientsThunk
} from '../../services/slices/ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { Route, Routes } from 'react-router-dom';

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
        <Routes>
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:orderNumber' element={<OrderInfo />} />
          <Route path='*' element={<NotFound404 />} />
        </Routes>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
