import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import userSlice from '../../services/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector(userSlice.selectors.getUser);

  return <AppHeaderUI userName={user.name} />;
};
