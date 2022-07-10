import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import React from 'react';

interface Props {
  value: string;
  changeData: Function;
}

const UserCondition = (props: Props) => {
  return (
    <div className="product-detail-row product-detail-user-condition ">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Used condition</p>
      </div>
      <div className="product-detail-row-input product-detail-brand-input">
        <SelectForm
          className="product-detail-row-input-input-form select-form"
          key_name="brand"
          value={props.value}
          onChange={props.changeData}
          options={[
            {
              id: ' ',
              name: ' ',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UserCondition;
