import {
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import ingredientsSlice, {
  getIngredientsThunk
} from '../../services/slices/ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserThunk } from '../../services/slices/user';

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUserThunk());
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
        <Routes location={location}>
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:orderNumber' element={<OrderInfo />} />
          <Route
            path='ingredients/:ingredientId'
            element={<IngredientDetails />}
          />
          <Route
            path='/login'
            element={
              <ProtectedRoute onlyUnAuth>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute onlyUnAuth>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute onlyUnAuth>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:orderNumber'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
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
