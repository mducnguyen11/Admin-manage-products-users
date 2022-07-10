import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import React, { useEffect, useState } from 'react';
import UserCondition from '../UserCondition/UserCondition';
import './condition.scss';
interface Props {
  value: string;
  onChange: Function;
}

const ConditionForm = (props: Props) => {
  const [value, setValue] = useState<string>(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleChange = (a: { inventory_tracking: string }) => {
    setValue(a.inventory_tracking);
    if (props.value == '0') {
      props.onChange({
        inventory_tracking: '1',
      });
    } else {
      props.onChange({
        inventory_tracking: '0',
      });
    }
  };
  return (
    <>
      <div className="product-detail-row  product-detail-condition">
        <div className="product-detail-row-name">
          <p className="product-detail-row-name-p">Condition</p>
        </div>
        <div className="product-detail-row-input product-detail-condition-input">
          <SelectForm
            className="product-detail-condition-input-value select-form"
            key_name="inventory_tracking"
            value={value}
            onChange={handleChange}
            options={[
              {
                id: '0',
                name: 'Used',
              },
            ]}
          />
          <span>Select Used Condition</span>
        </div>
      </div>
      {value !== '1' ? <UserCondition value="" changeData={() => {}} /> : null}
    </>
  );
};

export default ConditionForm;
