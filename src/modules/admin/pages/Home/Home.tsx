import { API_PATHS } from 'configs/api';
import { setCategories } from 'modules/admin/redux/categoriesReducer';
import { setCountry } from 'modules/admin/redux/countryReducer';
import { setVendors } from 'modules/admin/redux/vendorReducer';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {}

const Home = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const getAllCountry = async () => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.getCommonCountry));
      dispatch(setCountry(res.data));
    } catch (error) {
      console.log('errr');
    }
  };
  const getCategories = async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCategoriesList, 'get'));
    dispatch(setCategories(res.data));
  };
  const getVendorList = async () => {
    const xx = await dispatch(fetchThunk(API_PATHS.getVendorsList));
    console.log(xx);
    if (xx.data && xx.success) {
      dispatch(setVendors(xx.data));
    }
  };
  useEffect(() => {
    getCategories();
    getVendorList();
    getAllCountry();
  }, []);

  return <></>;
};

export default Home;
