import { API_PATHS } from 'configs/api';
import SearchSuggetForm from 'modules/admin/components/SelectAutoSuggetForm/SearchSuggetForm';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  onChange: Function;
  errorMessage?: string;
}

const Vendor = (props: Props) => {
  console.log('vendor render');
  const [vendorList, setVendorList] = useState<
    {
      companyName: string;
      id: string | number;
      login: string;
      name: string;
    }[]
  >([]);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getVendorList = useCallback(async (a?: string) => {
    const res = await dispatch(fetchThunk(API_PATHS.getVendorsList, 'post', { search: a ? a : '' }));
    console.log('vendor res :', a, res);
    if (res.data && res.success) {
      if (a) {
        setVendorList(res.data);
      } else {
        setVendorList([...res.data]);
      }
    } else {
      setVendorList([]);
    }
  }, []);
  useEffect(() => {
    getVendorList();
  }, []);

  return (
    <SearchSuggetForm
      name="vendor_id"
      options={vendorList}
      errorMessage={props.errorMessage}
      value={props.value}
      changeData={props.onChange}
    />
  );
};

export default memo(Vendor);
