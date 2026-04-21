import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginThunk } from '../../services/slices/user';
import { useDispatch } from '../../services/store';
import { NavigateOptions, useLocation, useNavigate } from 'react-router-dom';
import { TLoginData } from '@api';

export const Login: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const loginData: TLoginData = {
      email: email,
      password: password
    };

    dispatch(loginThunk(loginData)).then((_) => {
      const navigateOptions: NavigateOptions = {
        replace: true
      };

      navigate(from, navigateOptions);
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
