import { IUserDataField } from 'models/user';
import InputField from 'modules/common/components/InputField/InputField';

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
        <InputField
          value={props.value}
          onChange={(value: string) => {
            props.onChange({ [props.key_name]: value });
          }}
          error={props.error}
        />
      </div>
    </div>
  );
};

export default UserInputRowItem;
