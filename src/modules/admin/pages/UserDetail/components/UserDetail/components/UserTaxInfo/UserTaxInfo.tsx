import React, { useEffect, useState } from 'react';

interface Props {
  taxExempt: string;
  onChange: Function;
}

const UserTaxInfo = (props: Props) => {
  const [value, setValue] = useState<string>(props.taxExempt);
  useEffect(() => {
    if (props.taxExempt !== value) {
      setValue(props.taxExempt);
    }
  }, [props.taxExempt]);

  return (
    <div className="user-detail-section">
      <h2>{`Tax information`}</h2>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Tax exempt</p>
        <div className="user-detail-row-value">
          <input
            checked={value !== '0'}
            onChange={() => {
              if (value == '0') {
                setValue('1');
                props.onChange({
                  taxExempt: '1',
                });
              } else {
                setValue('0');
                props.onChange({
                  taxExempt: '0',
                });
              }
            }}
            type={'checkbox'}
          />
        </div>
      </div>
    </div>
  );
};

export default UserTaxInfo;
