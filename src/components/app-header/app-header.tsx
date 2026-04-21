import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import userSlice from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userName = useSelector(userSlice.selectors.getName);

  return <AppHeaderUI userName={userName} />;
};
