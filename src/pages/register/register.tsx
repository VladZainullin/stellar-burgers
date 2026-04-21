import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { registerThunk } from '../../services/slices/user';
import { TRegisterData } from '@api';
import { NavigateOptions, useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const registerData: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };

    dispatch(registerThunk(registerData)).then(() => {
      const navigateOptions: NavigateOptions = {
        replace: true
      };

      navigate('/profile', navigateOptions);
    });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
