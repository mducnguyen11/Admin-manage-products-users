import { IUserDataField } from 'models/admin/user';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import { USER_MEMBERSHIPS_OPTIONS } from 'modules/admin/ultis';
import React from 'react';

interface Props {
  value: string;
  onChange: (a: IUserDataField) => void;
}

const UserMemberships = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">Membership</p>
      <div className="user-detail-row-value">
        <SelectForm
          value={props.value || ''}
          options={USER_MEMBERSHIPS_OPTIONS}
          onChange={props.onChange}
          key_name="membership_id"
        />
      </div>
    </div>
  );
};

export default UserMemberships;
