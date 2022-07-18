import SelectForm from 'modules/common/components/SelectForm/SelectForm';
import React from 'react';
import { useSelector } from 'react-redux';

import { AppState } from 'redux/reducer';

interface Props {
  value: string;
  onChange: Function;
}

const Country = (props: Props) => {
  const listCountry = useSelector((state: AppState) => state.country.country);
  return (
    <SelectForm
      value={props.value}
      onChange={(value: string) => {
        props.onChange({
          country: value,
        });
      }}
      options={[
        { value: '', name: 'Select Country' },
        ...listCountry.map((item) => {
          return {
            value: item.code,
            name: item.country,
          };
        }),
      ]}
    />
  );
};

export default Country;
