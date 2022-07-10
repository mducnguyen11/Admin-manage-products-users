import { API_PATHS } from 'configs/api';
import SelectAPISuggetForm from 'modules/admin/components/SelectAPISuggetForm/SelectAPISuggetForm';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  changeData: Function;
}

const FilterVendorForm = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [list, setList] = useState<{ companyName: string; id: string; login: string; name: string }[]>([]);
  const getVendorList = async (a: string) => {
    if (a.length >= 2) {
      const xx = await dispatch(fetchThunk(API_PATHS.getVendorsList, 'post', { search: a }));
      console.log(xx);
      if (xx.data && xx.success) {
        setList(xx.data);
      } else {
        setList([]);
      }
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    getVendorList(props.value);
  }, [props.value]);
  return (
    <>
      <SelectAPISuggetForm
        options={list}
        value={props.value}
        changeData={props.changeData}
        name="vendor"
        onSearch={getVendorList}
      />
    </>
  );
};

export default FilterVendorForm;
