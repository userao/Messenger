import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import keyBy from 'lodash/keyBy.js';

const SignupForm = () => {
  const schema = yup.object().shape({
    username: yup.string().trim().required().min(3).max(20),
    password: yup.string().required().min(6),
    passwordConfirmation: yup.string()
      .required('password confirmation is a required field')
      .oneOf(
        [yup.ref('password'), null],
        'password confirmation does not match to password',
      ),
  });

  const validate = async (values) => {
    try {
      schema.validateSync(values, { abortEarly: false });
      return {};
    } catch (e) {
      return keyBy(e.inner, 'path');
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validate,
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
                      value={formik.values.username}
                    />
                    {
                      formik.errors.username
                        ? <div className="alert-danger" placement="right">{formik.errors.username.message}</div>
                        : null
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
                      value={formik.values.password}
                    />
                    {
                    formik.errors.password
                      ? <div className="alert-danger" placement="right">{formik.errors.password.message}</div>
                      : null
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
                      value={formik.values.repeatPassword}
                    />
                    {
                    formik.errors.passwordConfirmation
                      ? <div className="alert-danger" placement="right">{formik.errors.passwordConfirmation.message}</div>
                      : null
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
