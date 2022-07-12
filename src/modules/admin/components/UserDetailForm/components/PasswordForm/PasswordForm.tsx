import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  onChange: Function;
  value: { password: string; confirm_password: string };
  errors: {
    password?: string;
    confirm_password?: string;
  };
}

const PasswordForm = (props: Props) => {
  const [password, setPassword] = useState<string>('');
  const [confirm_password, setConfirm_password] = useState<string>('');
  const handleBlur = () => {
    if (confirm_password !== '') {
      props.onChange({
        password: password,
        confirm_password: confirm_password,
      });
    } else {
      props.onChange({
        password: password,
      });
    }
  };
  useEffect(() => {
    if (props.value.password !== password) {
      setPassword(props.value.password);
    }
    if (props.value.confirm_password !== confirm_password) {
      setConfirm_password(props.value.confirm_password);
    }
  }, [props.value.password, props.value.confirm_password]);
  return (
    <>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Password *</p>
        <div className="user-detail-row-value">
          <div className="admin-input-form-wrapper">
            <input
              className="admin-input-form"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onBlur={handleBlur}
            />
            {props.errors.password ? (
              <div className="input-error-message">
                <span className="error-message"> {<FormattedMessage id={props.errors.password} />}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Confirm Password *</p>
        <div className="user-detail-row-value">
          <div className="admin-input-form-wrapper">
            <input
              className="admin-input-form"
              type="password"
              value={confirm_password}
              onChange={(e) => {
                setConfirm_password(e.target.value);
              }}
              onBlur={() => {
                if (password !== '') {
                  props.onChange({
                    password: password,
                    confirm_password: confirm_password,
                  });
                } else {
                  props.onChange({
                    confirm_password: confirm_password,
                  });
                }
              }}
            />
            {props.errors.confirm_password ? (
              <div className="input-error-message">
                <span className="error-message"> {<FormattedMessage id={props.errors.confirm_password} />}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordForm;
