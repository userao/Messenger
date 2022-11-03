import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import i18n from '../i18n.js';

const LoginForm = () => {
  const usernameInput = useRef(null);
  useEffect(() => usernameInput.current.focus(), []);
  const [loginState, setLoginState] = useState('idle');
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
        localStorage.setItem('user', JSON.stringify({
          token: response.data.token,
          name: auth.username,
        }));
        context.logIn();
        setLoginState('success');
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setLoginState('incorrect data');
        } else {
          setLoginState('connection error');
          toast.error(i18n.t('toastifyNotifications.connectionError'), { autoClose: false });
        }
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
                <h1 className="text-center mb-4">{i18n.t('loginPage.header')}</h1>
                <Form.Floating
                  className="mb-3"
                >
                  <Form.Control
                    ref={usernameInput}
                    required
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    placeholder={i18n.t('loginPage.usernameLabel')}
                    className={loginState === 'incorrect data' ? 'is-invalid' : null}
                    disabled={loginState === 'requesting'}
                  />
                  <label className="form-label" htmlFor="username">{i18n.t('loginPage.usernameLabel')}</label>
                </Form.Floating>

                <Form.Floating
                  className="mb-4"
                >
                  <Form.Control
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder={i18n.t('loginPage.passwordLabel')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className={loginState === 'incorrect data' ? 'is-invalid' : null}
                    disabled={loginState === 'requesting'}
                  />
                  <label className="form-label" htmlFor="password">{i18n.t('loginPage.passwordLabel')}</label>
                  {loginState === 'success' && navigate(redirectPath)}
                  {loginState === 'incorrect data'
                    ? <div className="invalid-tooltip">{i18n.t('loginPage.invalidTooltip')}</div>
                    : null}
                </Form.Floating>
                <Button
                  className="w-100"
                  disabled={loginState === 'requesting'}
                  variant="primary"
                  type="submit"
                >
                  {i18n.t('loginPage.logInButton')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {i18n.t('loginPage.footerText')}
                </span>
                {' '}
                <a href="/signup">{i18n.t('loginPage.registerLink')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
