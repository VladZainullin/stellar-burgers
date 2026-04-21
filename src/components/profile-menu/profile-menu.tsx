import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutThunk } from '../../services/slices/user';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = async () => {
    await dispatch(logoutThunk()).unwrap();
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
