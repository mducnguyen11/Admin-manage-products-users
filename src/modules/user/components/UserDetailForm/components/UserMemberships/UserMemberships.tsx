import { IUserDataField } from 'models/user';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { USER_MEMBERSHIPS_CREATE_OPTIONS } from 'modules/user/constants';

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
          options={USER_MEMBERSHIPS_CREATE_OPTIONS}
          onChange={props.onChange}
          key_name="membership_id"
        />
      </div>
    </div>
  );
};

export default UserMemberships;
