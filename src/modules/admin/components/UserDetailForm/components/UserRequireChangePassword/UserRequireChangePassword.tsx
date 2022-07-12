import { IUserDataField } from 'models/admin/user';
import Checkbox from 'modules/admin/components/Checkbox/Checkbox';
import React from 'react';

interface Props {
  value: string;
  onChange: (a: IUserDataField) => void;
}

const UserRequireChangePassword = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">Require to change password on next log in</p>
      <div className="user-detail-row-value">
        <Checkbox
          value={props.value == '1'}
          onChange={() => {
            if (props.value == '1') {
              props.onChange({
                forceChangePassword: '0',
              });
            } else {
              props.onChange({
                forceChangePassword: '1',
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserRequireChangePassword;
