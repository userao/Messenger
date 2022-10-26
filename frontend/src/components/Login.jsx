import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const usernameInput = useRef(null);
  useEffect(() => usernameInput.current.focus(), []);
  const [loginState, setLoginState] = useState('idle');
  const context = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state ? location.state.from.pathname : '/';
  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });

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
          toast.error(t('toastifyConnectionError'), { autoClose: false });
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
                <h1 className="text-center mb-4">{t('header')}</h1>
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
                    placeholder={t('usernameLabel')}
                    className={loginState === 'incorrect data' ? 'is-invalid' : null}
                    disabled={loginState === 'requesting'}
                  />
                  <label className="form-label" htmlFor="username">{t('usernameLabel')}</label>
                </Form.Floating>

                <Form.Floating
                  className="mb-4"
                >
                  <Form.Control
                    required
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('passwordLabel')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className={loginState === 'incorrect data' ? 'is-invalid' : null}
                    disabled={loginState === 'requesting'}
                  />
                  <label className="form-label" htmlFor="password">{t('passwordLabel')}</label>
                  {loginState === 'success' && navigate(redirectPath)}
                  {loginState === 'incorrect data'
                    ? <div className="invalid-tooltip">{t('invalidTooltip')}</div>
                    : null}
                </Form.Floating>
                <Button className="w-100" disabled={loginState === 'requesting'} variant="primary" type="submit">{t('logInButton')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('footerText')}
                </span>
                {' '}
                <a href="/signup">{t('registerLink')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
