import { IUserDataField } from 'models/user';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import { USER_TYPES_OPTIONS } from 'modules/user/constants';
import React from 'react';

interface Props {
  joined?: string;
  value: string;
  onChange: (a: IUserDataField) => void;
}

const UserType = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">Type</p>
      {props.joined ? (
        <p className="user-detail-row-value">{props.value}</p>
      ) : (
        <div className="user-detail-row-value">
          <SelectForm
            value={props.value}
            key_name="paymentRailsType"
            options={USER_TYPES_OPTIONS}
            onChange={props.onChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserType;
