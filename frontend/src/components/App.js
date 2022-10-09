import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import {
  Container,
  Nav,
  Navbar,
  Button,
} from 'react-bootstrap';
import Home from './Home.jsx';
import LoginForm from './Login.jsx';
import SignupForm from './Signup.jsx'
import NotFound from './NotFound.jsx';

const routes = ['/', '/login'];

const App = () => (
  <div className="h-100" id="chat">
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar className="shadow-sm" bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">My chat</Navbar.Brand>
            <Button href="/login" variant="primary">Login</Button>
          </Container>
        </Navbar>
      
        <Routes>
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  </div>
);

export default App;
