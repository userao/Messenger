import { React, useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import routes from '../routes.js';
import cn from 'cn';
import useAuth from '../hooks/useAuth.js';

const LoginForm = () => {
  const usernameInput = useRef(null);
  useEffect(() => usernameInput.current.focus(), []);
  const [loginState, setLoginState] = useState(null);
  const context = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state ? location.state.from.pathname : '/';

  const handleSubmit = (values) => {
    const auth = {
      username: values.username,
      password: values.password,
    };
    setLoginState('requesting');
    axios.post(routes.loginPath(), auth)
      .then((response) => {
        localStorage.setItem('userId', JSON.stringify({ token: response.data.token }));
        context.logIn();
        setLoginState('success');
      })
      .catch((e) => {
        setLoginState('error');
        console.log(e);
      });
  };
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Login</h1>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label="Your username"
                    htmlFor="username"
                  >
                    <Form.Control
                      ref={usernameInput}
                      required
                      id="username"
                      name="username"
                      type="username"
                      placeholder="Enter username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      className={loginState === 'error' ? 'is-invalid' : null}
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label="Your password"
                    htmlFor="password"
                  >
                    <Form.Control
                      required
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      className={loginState === 'error' ? 'is-invalid' : null}
                    />
                    {loginState === 'success' && navigate(redirectPath)}
                    {loginState === 'error'
                      ? <div className="invalid-tooltip">Invalid username or password</div>
                      : null}
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100" disabled={loginState === 'requesting'} variant="primary" type="submit">Submit</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Don't have an account yet?</span>
                <a href="/signup">Register</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
