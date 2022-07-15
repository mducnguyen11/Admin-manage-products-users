import { IUserDataField } from 'models/admin/user';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { USER_ACCOUNT_STATUS_OPTIONS } from 'modules/user/constants';
import React from 'react';

interface Props {
  value: string;
  onChange: (a: IUserDataField) => void;
}

const UserStatus = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">Account status *</p>
      <div className="user-detail-row-value">
        <SelectForm
          value={props.value}
          options={USER_ACCOUNT_STATUS_OPTIONS}
          onChange={props.onChange}
          key_name="status"
        />
      </div>
    </div>
  );
};

export default UserStatus;
