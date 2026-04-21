import { FC } from 'react';
import { TProtectedRouteProps } from './type';
import { useSelector } from '../../services/store';
import userSlice from '../../services/slices/user';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProtectedRoute: FC<TProtectedRouteProps> = (props) => {
  const isAuthenticated = useSelector(userSlice.selectors.getIsAuthenticated);
  const isAuthenticatedChecked = useSelector(
    userSlice.selectors.getIsAuthenticatedChecked
  );

  const location = useLocation();

  if (!isAuthenticatedChecked) {
    return <Preloader />;
  }

  if (!props.onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (props.onlyUnAuth && isAuthenticated) {
    const { from } = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return props.children;
};
