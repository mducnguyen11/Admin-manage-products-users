import { IUserDataField } from 'models/user';
import InputField from 'modules/common/components/InputField/InputField';
import React from 'react';

interface Props {
  value: string;
  onChange: (a: IUserDataField) => void;
}

const UserComment = (props: Props) => {
  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">Status comment (reason)</p>
      <div className="user-detail-row-value">
        <InputField value={props.value} onChange={props.onChange} key_name="statusComment" />
      </div>
    </div>
  );
};

export default UserComment;
