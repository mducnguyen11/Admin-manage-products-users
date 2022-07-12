import { IUserDataField } from 'models/admin/user';
import InputField from 'modules/admin/components/InputField/InputField';

import React from 'react';

interface Props {
  fieldName: string;
  key_name: string;
  value: string;
  onChange: (a: IUserDataField) => void;
  error?: string;
}

const UserInputRowItem = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">{props.fieldName}</p>
      <div className="user-detail-row-value">
        <InputField key_name={props.key_name} value={props.value} onChange={props.onChange} error={props.error} />
      </div>
    </div>
  );
};

export default UserInputRowItem;
