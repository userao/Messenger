import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const SignupForm = () => {
  const [signupState, setSignupState] = useState('idle');
  const context = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const usernameInput = useRef(null);
  const redirectPath = location.state ? location.state.from.pathname : '/';
  const { t } = useTranslation('translation', { keyPrefix: 'signupPage' });

  useEffect(() => usernameInput?.current.focus(), []);

  const handleSubmit = (values) => {
    const { username, password } = values;
    axios.post(routes.signupPath(), { username, password })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify({
          token: response.data.token,
          name: username,
        }));
        context.logIn();
        setSignupState('success');
      })
      .catch((e) => {
        console.log(e);
        setSignupState('error');
      });
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .trim()
        .min(3, t('usernameInvalidLength'))
        .max(20, t('usernameInvalidLength'))
        .required(t('requiredField')),
      password: yup.string()
        .min(6, t('passwordTooShort'))
        .required(t('requiredField')),
      passwordConfirmation: yup.string()
        .oneOf(
          [yup.ref('password'), null],
          t('confirmationMustMatch'),
        )
        .required(t('requiredField')),
    }),
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
                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label={t('usernameLabel')}
                    htmlFor="username"
                  >
                    <Form.Control
                      ref={usernameInput}
                      id="username"
                      name="username"
                      type="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      placeholder={t('usernameInvalidLength')}
                      className={
                        (formik.touched.username && formik.errors.username) || signupState === 'error'
                          ? 'is-invalid'
                          : null
                      }
                    />
                    {
                      formik.touched.username && formik.errors.username
                        ? <div className="invalid-tooltip">{formik.errors.username}</div>
                        : null
                    }
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label={t('passwordLabel')}
                    htmlFor="password"
                  >
                    <Form.Control
                      id="password"
                      name="password"
                      type="password"
                      placeholder={t('passwordTooShort')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={
                        (formik.touched.password && formik.errors.password) || signupState === 'error'
                          ? 'is-invalid'
                          : null
                      }
                    />
                    {
                      formik.touched.password && formik.errors.password
                        ? <div className="invalid-tooltip">{formik.errors.password}</div>
                        : null
                    }
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label={t('passwordConfirmationLabel')}
                    htmlFor="passwordConfirmation"
                  >
                    <Form.Control
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      placeholder={t('confirmationMustMatch')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.repeatPassword}
                      className={
                        (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation) || signupState === 'error'
                          ? 'is-invalid'
                          : null
                      }
                    />
                    {
                      formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
                        ? <div className="invalid-tooltip">{formik.errors.passwordConfirmation}</div>
                        : null
                    }
                    {signupState === 'error' && <div className="invalid-tooltip">{t('signupError')}</div>}
                    {signupState === 'success' && navigate(redirectPath)}
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100" variant="outline-primary" type="submit">{t('registerButton')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
