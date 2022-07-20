import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import { setCategories } from 'modules/common/redux/categoriesReducer';

import { setShippings } from 'modules/common/redux/shippingReducer';
import { setCountry } from 'modules/common/redux/countryReducer';
import { setVendors } from 'modules/common/redux/vendorReducer';
import { AppState } from 'redux/reducer';
interface Props {
  children?: React.ReactNode;
}

const AdminProvider = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getShippingList = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getShippingList));
    if (res.success) {
      console.log('vc');
      dispatch(setShippings(res.data));
    }
  }, [dispatch]);
  const getAllCountry = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCommonCountry));
    if (res.success) {
      dispatch(setCountry(res.data));
    }
  }, [dispatch]);
  const getCategories = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCategoriesList, 'get'));
    if (res.success) {
      dispatch(setCategories(res.data));
    }
  }, [dispatch]);
  const getVendorList = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getVendorsList));
    if (res.data && res.success) {
      dispatch(setVendors(res.data));
    }
  }, [dispatch]);

  React.useEffect(() => {
    getCategories();
    getVendorList();
    getAllCountry();
    getShippingList();
    return () => {
      dispatch(setVendors([]));
      dispatch(setCategories([]));
      dispatch(setCountry([]));
      dispatch(setShippings([]));
    };
  }, []);
  return <>{props.children}</>;
};

export default AdminProvider;
