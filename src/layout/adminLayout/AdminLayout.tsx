import React, { useEffect, useState } from 'react';
import Sidebar from 'modules/common/components/Sidebar/Sidebar';
import Header from 'modules/common/components/Header/Header';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import { setCategories } from 'modules/common/redux/categoriesReducer';
import './AdminLayout.scss';
import { setShippings } from 'modules/common/redux/shippingReducer';
import { setCountry } from 'modules/common/redux/countryReducer';
import { setVendors } from 'modules/common/redux/vendorReducer';
interface Props {
  children: React.ReactNode;
}

const AdminLayout = (props: Props) => {
  const [expandSidebar, setExpandSidebar] = useState(true);
  const route = useSelector((state: AppState) => state.router.location);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);
  const getShippingList = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getShippingList));
    if (res.success) {
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
  return (
    <div className="admin-layout">
      <div className="admin-layout-header">
        <Header
          expandSidebar={() => {
            setExpandSidebar(!expandSidebar);
          }}
        />
      </div>
      <div className="admin-layout-container">
        <div className="admin-layout-sidebar">
          <Sidebar
            onChangeSidebarExpand={() => {
              setExpandSidebar(!expandSidebar);
            }}
            expand={expandSidebar}
          />
        </div>
        <div className="admin-layout-content">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
