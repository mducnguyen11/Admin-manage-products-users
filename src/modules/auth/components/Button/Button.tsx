import { CircularProgress } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import './button.scss';
interface Props {
  loading?: boolean;
  message: string;
}
const Button = (props: Props) => {
  return (
    <button className="btn btn-primary" type="submit">
      {props.loading && <CircularProgress size={20} />}
      <p>
        <FormattedMessage id={props.message} />
      </p>
    </button>
  );
};

export default Button;
