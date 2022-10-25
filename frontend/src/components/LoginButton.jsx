import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth';

const LoginButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });
  const auth = useAuth();
  const location = useLocation();

  const buttonTypes = {
    true: () => <Button onClick={auth.logOut}>{t('logOutButton')}</Button>,
    false: () => {
      if (location.pathname === '/login') return null;
      return <Button href="/login" state={{ from: location }}>{t('logInButton')}</Button>;
    },
  };
  const buttonElement = buttonTypes[auth.loggedIn]();

  return buttonElement;
};

export default LoginButton;
