import React from 'react';
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps, ErrorMessage } from 'formik';
import { FormattedMessage } from 'react-intl';

interface Props {
  type: string;
  className: string;
  id: string;
  name: string;
  errorMessage?: string;
  label: string;
}

const InputForm = (props: Props) => {
  const { type, className, label, id, name, errorMessage } = props;
  return (
    <>
      <label htmlFor="inputPassword" className="form-label">
        <FormattedMessage id={label} />
      </label>
      <Field type={type} className={className} id={id} name={name} />
      <small className="text-danger">
        {errorMessage ? <FormattedMessage id={errorMessage} /> : null}
        {/* {validateError.email !== '' ? <FormattedMessage id={validateError.email} /> : null} */}
        {/* <ErrorMessage name="email"/> */}
      </small>
    </>
  );
};

export default InputForm;
