import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import feedsSlice, { getFeedsThunk } from '../../services/slices/feeds';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeedsThunk());
  };

  const orders: TOrder[] = useSelector(feedsSlice.selectors.getOrders);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
