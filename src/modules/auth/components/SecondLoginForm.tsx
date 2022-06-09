import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import './SecondLoginForm.scss';
import * as Yup from 'yup';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, ErrorMessage } from 'formik';
interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const SecondLoginForm = (props: any) => {
  const { onLogin, loading, errorMessage } = props;
  const [validateError, setValiateError] = useState({ email: '', password: '' });

  const formikValidate = Yup.object({
    password: Yup.string().required({ password: 'passwordRequire' }).min(4, { password: 'minPasswordInvalid' }),

    email: Yup.string().required({ email: 'emailRequire' }).email({ email: 'emailInvalid' }),
  });

  return (
    <Formik<ILoginParams>
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={formikValidate}
      onSubmit={async (values) => {
        console.log('login with values:', values);
        setValiateError({
          email: '',
          password: '',
        });
        onLogin(values);
      }}
    >
      {({ handleSubmit, values, handleChange }) => {
        return (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              console.log('form submit');

              try {
                const val = await formikValidate.validate({
                  password: values.password,
                  email: values.email,
                });
                console.log('values validata : ', val);
              } catch (error) {
                const errors: {}[] = JSON.parse(JSON.stringify(error)).errors;
                console.log(errors);
                const initError = {
                  email: '',
                  password: '',
                };
                // errors.reverse()
                errors.map((a) => {
                  setValiateError({
                    ...initError,
                    ...a,
                  });
                });
              }

              handleSubmit();
            }}
            className="secondloginform row g-3 needs-validation"
          >
            {errorMessage ? (
              <div className=" secondloginform-errormessage alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null}
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label">
                <FormattedMessage id="email" />
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                name="email"
                // value={formValues.email}
                // onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                value={values.email}
                onChange={handleChange}
              />
              <small className="text-danger">
                {validateError.email !== '' ? <FormattedMessage id={validateError.email} /> : null}
                {/* <ErrorMessage name="email"/> */}
              </small>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword" className="form-label">
                <FormattedMessage id="password" />
              </label>
              <input
                type="password"
                className="form-control"
                id="inputPassword"
                // value={formValues.password}
                // onChange={(e)=>{ setFormValues({...formValues,password:e.target.value})}}
                name="password"
                value={values.password}
                onChange={handleChange}
              />
              <small className="text-danger">
                {validateError.password !== '' ? <FormattedMessage id={validateError.password} /> : null}
              </small>
            </div>
            <div className="col-12">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="invalidCheck"
                  name="rememberMe"
                  checked={values.rememberMe}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="invalidCheck">
                  <FormattedMessage id="rememberMe" />
                </label>
              </div>
            </div>
            <div className="row justify-content-md-center secondloginform-btn">
              <div className="col-md-auto">
                <button className="btn btn-primary" type="submit">
                  {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                  <p style={{}}>
                    <FormattedMessage id="register" />
                  </p>
                </button>
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SecondLoginForm;
