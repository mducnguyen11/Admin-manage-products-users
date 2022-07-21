import { IUserDataField } from 'models/user';
import React, { memo, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
  value: {
    password: string;
    confirm_password: string;
  };
  onChange: (value: IUserDataField) => void;
  errors: {
    password?: string;
    confirm_password?: string;
  };
}

const UserPasswordForm = (props: Props) => {
  const [password, setPassword] = useState<string>('');
  const [confirm_password, setConfirm_password] = useState<string>('');
  const [typing, setTyping] = useState<boolean>(false);
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
                if (props.errors.password) {
                  props.onChange({
                    password: e.target.value,
                  });
                }
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
                if (props.errors.confirm_password == 'requiredField') {
                  if (!typing) {
                    setTyping(true);
                  }
                  props.onChange({
                    confirm_password: e.target.value,
                  });
                } else {
                  if (!typing) {
                    setTyping(true);
                  }
                }
              }}
              onBlur={() => {
                if (typing) {
                  setTyping(false);
                }
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
            {props.errors.confirm_password && !typing ? (
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

export default memo(UserPasswordForm);
