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

import { IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { getUserThunk } from '../../services/slices/user';
import feedsSlice from '../../services/slices/feeds';
import { Layout } from '../layout';
import { getIngredientsThunk } from '../../services/slices/ingredients';

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

  return (
    <Layout>
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
    </Layout>
  );
};

export default App;
