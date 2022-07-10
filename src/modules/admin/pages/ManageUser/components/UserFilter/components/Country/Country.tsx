import { API_PATHS } from 'configs/api';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  onChange: Function;
}

const Country = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listCountry, setListCountry] = useState<
    { code: string; country: string; id: string; name: string; [key: string]: any }[]
  >([]);
  const getAllCountry = async () => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.getCommonCountry));
      console.log('country : ', res.data);
      setListCountry([
        ...res.data.map((a: any) => {
          return {
            ...a,
            name: a.country,
          };
        }),
      ]);
    } catch (error) {
      console.log('errr');
    }
  };
  useEffect(() => {
    getAllCountry();
  }, []);

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
