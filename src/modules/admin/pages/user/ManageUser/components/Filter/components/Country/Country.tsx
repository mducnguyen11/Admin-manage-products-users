import { API_PATHS } from 'configs/api';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  onChange: Function;
}

const Country = (props: Props) => {
  const listCountry = useSelector((state: AppState) => state.country.country);
  return (
    <SelectForm
      key_name="country"
      value={props.value}
      onChange={props.onChange}
      options={[
        { id: '', name: 'Select Country' },
        ...listCountry.map((x) => {
          return {
            id: x.code,
            name: x.country,
          };
        }),
      ]}
    />
  );
};

export default Country;
