import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from '../../services/store';
import userSlice, { getUserOrdersThunk } from '../../services/slices/user';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(userSlice.selectors.getOrders);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
