import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';
import i18n from '../i18n.js';

const SignupForm = () => {
  const [signupState, setSignupState] = useState('idle');
  const context = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const usernameInput = useRef(null);
  const redirectPath = location.state ? location.state.from.pathname : '/';

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
        .min(3, i18n.t('signupPage.usernameInvalidLength'))
        .max(20, i18n.t('signupPage.usernameInvalidLength'))
        .required(i18n.t('signupPage.requiredField')),
      password: yup.string()
        .min(6, i18n.t('signupPage.passwordTooShort'))
        .required(i18n.t('signupPage.requiredField')),
      passwordConfirmation: yup.string()
        .oneOf(
          [yup.ref('password'), null],
          i18n.t('signupPage.confirmationMustMatch'),
        )
        .required(i18n.t('signupPage.requiredField')),
    }),
    validateOnChange: false,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{i18n.t('signupPage.header')}</h1>
                <Form.Floating
                  className="mb-3"
                >
                  <Form.Control
                    ref={usernameInput}
                    id="username"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={i18n.t('signupPage.usernameInvalidLength')}
                    className={
                      (formik.touched.username && formik.errors.username) || signupState === 'error'
                        ? 'is-invalid'
                        : null
                    }
                  />
                  <label className="form-label" htmlFor="username">{i18n.t('signupPage.usernameLabel')}</label>
                  {
                    formik.touched.username && formik.errors.username
                      ? <div className="invalid-tooltip">{formik.errors.username}</div>
                      : null
                  }
                </Form.Floating>

                <Form.Floating
                  className="mb-3"
                >
                  <Form.Control
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={i18n.t('signupPage.passwordTooShort')}
                    className={
                      (formik.touched.password && formik.errors.password) || signupState === 'error'
                        ? 'is-invalid'
                        : null
                    }
                  />
                  <label className="form-label" htmlFor="password">{i18n.t('signupPage.passwordLabel')}</label>
                  {
                    formik.touched.password && formik.errors.password
                      ? <div className="invalid-tooltip">{formik.errors.password}</div>
                      : null
                  }
                </Form.Floating>

                <Form.Floating
                  className="mb-4"
                >
                  <Form.Control
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.passwordConfirmation}
                    placeholder={i18n.t('signupPage.confirmationMustMatch')}
                    className={
                      (formik.touched.passwordConfirmation && formik.errors.passwordConfirmation) || signupState === 'error'
                        ? 'is-invalid'
                        : null
                    }
                  />
                  <label className="form-label" htmlFor="passwordConfirmation">{i18n.t('signupPage.passwordConfirmationLabel')}</label>
                  {
                    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation
                      ? <div className="invalid-tooltip">{formik.errors.passwordConfirmation}</div>
                      : null
                  }
                  {signupState === 'error' && <div className="invalid-tooltip">{i18n.t('signupPage.signupError')}</div>}
                  {signupState === 'success' && navigate(redirectPath)}
                </Form.Floating>
                <Button className="w-100" variant="outline-primary" type="submit">{i18n.t('signupPage.registerButton')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
