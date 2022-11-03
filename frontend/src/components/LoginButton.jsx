import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/useAuth';
import i18n from '../i18n.js';

const LoginButton = () => {
  const auth = useAuth();
  const location = useLocation();

  const buttonTypes = {
    true: () => <Button onClick={auth.logOut}>{i18n.t('navbar.logOutButton')}</Button>,
    false: () => {
      if (location.pathname === '/login') return null;
      return <Button href="/login" state={{ from: location }}>{i18n.t('navbar.logInButton')}</Button>;
    },
  };
  const buttonElement = buttonTypes[auth.loggedIn]();

  return buttonElement;
};

export default LoginButton;
