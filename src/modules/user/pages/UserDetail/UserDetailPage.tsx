import './UserDetailPage.scss';
import { API_PATHS } from 'configs/api';
import { IUserDetailData } from 'models/user';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import UserDetailForm from 'modules/user/components/UserDetailForm/UserDetailForm';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import { formartUserToPayload, validateUserDataToUpdate } from 'modules/user/utils';
import Tab from 'modules/common/components/Tab/Tab';

const UserDetailPage = () => {
  const params: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [tab, setTab] = React.useState(0);
  const [user, setUser] = useState<IUserDetailData>();
  const [alert, setAlert] = React.useState<{
    open: boolean;
    type: AlertColor;
    text: string;
  }>({
    open: false,
    type: 'success',
    text: '',
  });
  const handleShowAlertSuccess = (text: string) => {
    setAlert({
      open: true,
      type: 'success',
      text: text,
    });
  };
  const handleShowAlertError = (text: string) => {
    setAlert({
      open: true,
      type: 'error',
      text: text,
    });
  };
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
      open: false,
      type: 'error',
      text: '',
    });
  };
  const getUserData = useCallback(async () => {
    try {
      dispatch(setLoading());
      const res: {
        data: {
          info: IUserDetailData;
          [key: string]: any;
        };
        [key: string]: any;
      } = await dispatch(fetchThunk(API_PATHS.getUserDetail, 'post', params));
      setUser(res.data.info);
      dispatch(stopLoading());
    } catch (error) {
      history.push('/error');
    }
  }, [params.id, history, dispatch]);
  useEffect(() => {
    getUserData();
  }, [params.id, getUserData]);
  const hanlleUpdateUser = async (user: IUserDetailData) => {
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.userEdit, 'post', { params: [formartUserToPayload(user)] }));
    if (res.success && res.data) {
      setUser(res.data.info);
      handleShowAlertSuccess('Update successfully');
    } else {
      handleShowAlertError('Update fail');
    }
    dispatch(stopLoading());
  };

  return (
    <div className="user-detail-page">
      <div className="user-detail-page-back-btn">
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="bx bx-arrow-back"></i>{' '}
        </button>
      </div>
      <h2 className="user-name">
        {`${user?.email ? user?.email : ''}` + `${user?.companyName ? '( ' + user?.companyName + ' )' : ''}`}
      </h2>
      <div className="user-detail-content">
        <div className="user-detail-page-tabs-navigation">
          <p onClick={() => setTab(0)} className={tab == 0 ? 'tab-active' : ''}>
            Account Details
          </p>
          <p onClick={() => setTab(1)} className={tab == 1 ? 'tab-active' : ''}>
            Others tab
          </p>
        </div>
        {user ? (
          <div className="user-detail-page-tabs-content">
            <Tab value={0} index={tab}>
              <UserDetailForm onValidateUser={validateUserDataToUpdate} onSave={hanlleUpdateUser} user={user} />
            </Tab>
            <Tab value={1} index={tab}>
              hihih
            </Tab>
          </div>
        ) : null}
      </div>
      {alert.open ? (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={true}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
            {alert.text}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default UserDetailPage;
