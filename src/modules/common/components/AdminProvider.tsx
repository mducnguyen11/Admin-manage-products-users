import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const vendorList = useSelector((state: AppState) => state.vendors.vendors);
  const categoryList = useSelector((state: AppState) => state.categories.categories);
  const countryList = useSelector((state: AppState) => state.country.country);
  const shippings = useSelector((state: AppState) => state.shippings.shippings);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getShippingList = React.useCallback(async () => {
    if (shippings) {
      if (shippings.length == 0) {
        const res = await dispatch(fetchThunk(API_PATHS.getShippingList));
        if (res.success) {
          dispatch(setShippings(res.data));
        }
      }
    }
  }, [dispatch, shippings]);
  const getAllCountry = React.useCallback(async () => {
    if (countryList && countryList.length > 0) {
      return;
    } else {
      const res = await dispatch(fetchThunk(API_PATHS.getCommonCountry));
      if (res.success) {
        dispatch(setCountry(res.data));
      }
    }
  }, [dispatch, countryList]);
  const getCategories = React.useCallback(async () => {
    if (categoryList && categoryList.length > 0) {
      return;
    } else {
      const res = await dispatch(fetchThunk(API_PATHS.getCategoriesList, 'get'));
      if (res.success) {
        dispatch(setCategories(res.data));
      }
    }
  }, [dispatch, categoryList]);
  const getVendorList = React.useCallback(async () => {
    if (vendorList && vendorList.length >> 0) {
      return;
    } else {
      const res = await dispatch(fetchThunk(API_PATHS.getVendorsList));
      if (res.data && res.success) {
        dispatch(setVendors(res.data));
      }
    }
  }, [dispatch, vendorList]);

  React.useEffect(() => {
    getCategories();
    getVendorList();
    getAllCountry();
    getShippingList();
  }, []);
  return <>{props.children}</>;
};

export default AdminProvider;
