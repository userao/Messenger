import React from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { useFormik } from 'formik';

const LoginForm = () => {
  const validate = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
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
                <h1 className="text-center mb-4">Login</h1>
                <Form.Group className="mb-3">
                  <FloatingLabel
                    className="mb-3"
                    label="Your username"
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
                    />
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100" variant="primary" type="submit">Submit</Button>
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
