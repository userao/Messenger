import React from 'react';
import {
  Container,
  Navbar,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginButton from './LoginButton';

const Navigation = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  return (
    <Navbar className="shadow-sm" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">{t('brand')}</Navbar.Brand>
        <LoginButton />
      </Container>
    </Navbar>
  );
};

export default Navigation;
