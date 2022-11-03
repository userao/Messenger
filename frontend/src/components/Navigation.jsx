import React from 'react';
import {
  Container,
  Navbar,
} from 'react-bootstrap';
import LoginButton from './LoginButton';
import i18n from '../i18n.js';

const Navigation = () => (
  <Navbar className="shadow-sm" bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">{i18n.t('navbar.brand')}</Navbar.Brand>
      <LoginButton />
    </Container>
  </Navbar>
);

export default Navigation;
