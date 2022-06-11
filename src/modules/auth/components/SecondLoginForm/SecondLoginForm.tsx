import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../../models/auth';
import LoadingButton from '../LoadingButton/LoadingButton';
import './SecondLoginForm.scss';
import * as Yup from 'yup';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, ErrorMessage } from 'formik';
interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const SecondLoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;
  const formikValidate = Yup.object({
    password: Yup.string().required('passwordRequire').min(4, 'minPasswordInvalid'),
    email: Yup.string().required('emailRequire').email('emailInvalid'),
  });

  return (
    <Formik<ILoginParams>
      initialValues={{ email: '', password: '', rememberMe: false }}
      validationSchema={formikValidate}
      onSubmit={(values) => {
        onLogin(values);
      }}
    >
      {({ errors, touched }) => {
        return (
          <Form className="secondloginform row g-3 needs-validation">
            {errorMessage ? (
              <div className=" secondloginform-errormessage alert alert-danger" role="alert">
                {errorMessage}
              </div>
            ) : null}
            <div className="col-md-12">
              <label htmlFor="inputEmail" className="form-label">
                <FormattedMessage id="email" />
              </label>
              <Field type="text" className="form-control" id="inputEmail" name="email" />
              <small className="text-danger">
                {errors.email && touched.email ? <FormattedMessage id={errors.email} /> : null}
                {/* {validateError.email !== '' ? <FormattedMessage id={validateError.email} /> : null} */}
                {/* <ErrorMessage name="email"/> */}
              </small>
            </div>
            <div className="col-md-12">
              <label htmlFor="inputPassword" className="form-label">
                <FormattedMessage id="password" />
              </label>
              <Field type="password" className="form-control" id="inputPassword" name="password" />
              <small className="text-danger">
                {errors.password && touched.password ? <FormattedMessage id={errors.password} /> : null}
              </small>
            </div>
            <div className="col-12">
              <div className="form-check">
                <Field className="form-check-input" type="checkbox" id="invalidCheck" name="rememberMe" />
                <label className="form-check-label" htmlFor="invalidCheck">
                  <FormattedMessage id="rememberMe" />
                </label>
              </div>
            </div>
            <div className="row justify-content-md-center secondloginform-btn">
              <div className="col-md-auto">
                <LoadingButton loading={loading} message="register" />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SecondLoginForm;
