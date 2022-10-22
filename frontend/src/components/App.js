import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Container,
  Nav,
  Navbar,
  Button,
} from 'react-bootstrap';
import Chat from './Chat.jsx';
import LoginForm from './Login.jsx';
import SignupForm from './Signup.jsx';
import NotFound from './NotFound.jsx';
import AuthContext from '../context/AuthContext.js';
import useAuth from '../hooks/useAuth.js';
import ModalWindow from './ModalWindow.jsx';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const socket = io.connect();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};



const App = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'navbar' });

  const AuthButton = () => {
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

  return (
    <AuthProvider>
      <ModalWindow displayedModal={useSelector((state) => state.modal.displayedModal)} />
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Router>
            <Navbar className="shadow-sm" bg="light" expand="lg">
              <Container>
                <Navbar.Brand href="/">{t('brand')}</Navbar.Brand>
                <AuthButton />
              </Container>
            </Navbar>

            <Routes>
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/signup" element={<SignupForm />} />
              <Route
                exact
                path="/"
                element={(
                  <ChatRoute>
                    <Chat />
                  </ChatRoute>
                )}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
    </AuthProvider>
  )
};

export default App;
