/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { Provider, ErrorBoundary } from '@rollbar/react';
import Chat from './Chat.jsx';
import LoginForm from './Login.jsx';
import SignupForm from './Signup.jsx';
import NotFound from './NotFound.jsx';
import AuthContext from '../context/AuthContext.js';
import useAuth from '../hooks/useAuth.js';
import ModalWindow from './ModalWindow.jsx';
import MainContainer from './MainContainer.jsx';
import Navigation from './Navigation.jsx';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
};

const socket = io.connect();

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      loggedIn,
      logIn,
      logOut,
      socket,
    }}
    >
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

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <AuthProvider>
        <ModalWindow displayedModal={useSelector((state) => state.modal.displayedModal)} />
        <MainContainer>
          <Router>
            <Navigation />

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
        </MainContainer>
      </AuthProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
