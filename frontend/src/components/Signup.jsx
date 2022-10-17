import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import keyBy from 'lodash/keyBy.js';

const SignupForm = () => {


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: yup.object({
      username: yup.string()
        .trim()
        .min(3, 'Must be 3 to 20 symbols')
        .max(20, 'Must be 3 to 20 symbols')
        .required('This is required field'),
      password: yup.string()
        .min(6, 'Musts be longer then 6 symbols')
        .required('This is required field'),
      passwordConfirmation: yup.string()
        .oneOf(
          [yup.ref('password'), null],
          'Must match password',
        )
        .required('This is required field'),
      }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Register</h1>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label="Enter your username"
                    htmlFor="username"
                  >
                    <Form.Control
                      required
                      id="username"
                      name="username"
                      type="username"
                      placeholder="Enter username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      className={formik.touched.username && formik.errors.username ? 'is-invalid' : null}
                    />
                    {
                      formik.touched.username && formik.errors.username ? (
                        <div className="invalid-tooltip">{formik.errors.username}</div>
                    ) : null
                    }
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label="Enter your password"
                    htmlFor="password"
                  >
                    <Form.Control
                      required
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      className={formik.touched.password && formik.errors.password ? 'is-invalid' : null}
                    />
                    {
                      formik.touched.password && formik.errors.password ? (
                        <div className="invalid-tooltip">{formik.errors.password}</div>
                    ) : null
                    }
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label="Confirm your password"
                    htmlFor="passwordConfirmation"
                  >
                    <Form.Control
                      required
                      id="passwordConfirmation"
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Confirm your password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.repeatPassword}
                      className={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? 'is-invalid' : null}
                    />
                    {
                      formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                        <div className="invalid-tooltip">{formik.errors.passwordConfirmation}</div>
                    ) : null
                    }
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100" variant="outline-primary" type="submit">Register</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
