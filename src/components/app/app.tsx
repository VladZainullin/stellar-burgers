import {
  ConstructorPage,
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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Preloader } from '@ui';
import { useEffect } from 'react';
import ingredientsSlice, {
  getIngredientsThunk
} from '../../services/slices/ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserThunk } from '../../services/slices/user';
import feedsSlice from '../../services/slices/feeds';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const modalOnClose = () => {
    navigate(-1);
    dispatch(feedsSlice.actions.removeCurrentOrder());
  };

  const state = location.state as { background?: Location };

  useEffect(() => {
    dispatch(getIngredientsThunk());
    dispatch(getUserThunk());
  }, [dispatch]);

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
        <>
          <Routes location={state?.background || location}>
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
            <Route path='/' element={<ConstructorPage />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
          {state?.background && (
            <Routes>
              <Route
                path='/ingredients/:ingredientId'
                element={
                  <Modal title='Детали ингредиента' onClose={modalOnClose}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/feed/:orderNumber'
                element={
                  <Modal title='Детали заказа' onClose={modalOnClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:orderNumber'
                element={
                  <Modal title='Детали заказа' onClose={modalOnClose}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      ) : (
        <div className={`${styles.title} text text_type_main-medium pt-4`}>
          Нет игредиентов
        </div>
      )}
    </div>
  );
};

export default App;
