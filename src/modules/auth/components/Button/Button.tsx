import React from 'react';
import { FormattedMessage } from 'react-intl';
import './Button.scss';
interface Props {
  loading: boolean;
  message: string;
}
const Button = (props: Props) => {
  return (
    <button className="btn btn-primary" type="submit">
      {props.loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
      <p>
        <FormattedMessage id={props.message} />
      </p>
    </button>
  );
};

export default Button;
