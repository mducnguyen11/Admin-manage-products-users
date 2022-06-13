import React from 'react';
import { Field } from 'formik';
import { FormattedMessage } from 'react-intl';

interface option {
  id: string;
  name: string;
}
interface Props {
  name: string;
  options: option[];
  label: string;
  className?: string;
  id: string;
  errorMessage?: string;
  onChange?: Function;
  value?: string;
  onFocus?: Function;
  onBlur?: Function;
}

const SelectForm = (props: Props) => {
  const { name, value, options, label, id, className, errorMessage } = props;
  return (
    <>
      <label htmlFor="inputPassword" className="form-label">
        <FormattedMessage id={label} />
      </label>
      <Field as="select" className={className} id={id} name={name}>
        <option value={0}> -- Select an option --</option>
        {options.map((a, i) => {
          return (
            <option key={i} value={a.id}>
              {a.name}
            </option>
          );
        })}
      </Field>
      <small className="text-danger">{errorMessage ? <FormattedMessage id={errorMessage} /> : null}</small>
    </>
  );
};

export default SelectForm;
