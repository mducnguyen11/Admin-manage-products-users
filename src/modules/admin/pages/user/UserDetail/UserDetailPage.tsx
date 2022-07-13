import './user-detail-page.scss';
import { API_PATHS } from 'configs/api';
import { IUserDetailData } from 'models/admin/user';
import Tab from 'modules/admin/components/Tab/Tab';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { setLoading, stopLoading } from 'modules/admin/redux/loadingReducer';
import { Alert, Snackbar } from '@mui/material';
import UserDetail from 'modules/admin/components/UserDetailForm/UserDetail';
import { formartUserToPayload } from 'modules/admin/ultis';

interface Props {}

const UserDetailPage = (props: Props) => {
  const params: { id: string } = useParams();
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [tab, setTab] = React.useState(0);
  const [user, setUser] = useState<IUserDetailData>();
  const [alertSuccess, setAlertSuccess] = React.useState<string>('');
  const [alertError, setAlertError] = React.useState<string>('');
  const handleShowAlertSuccess = (a: string) => {
    setAlertSuccess(a);
  };
  const handleShowAlertError = (a: string) => {
    setAlertError(a);
  };
  const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertSuccess('');
  };
  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError('');
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
  }, [params.id]);
  useEffect(() => {
    getUserData();
  }, [params.id]);
  const hanlleUpdateUser = async (user: IUserDetailData) => {
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.userEdit, 'post', { params: [formartUserToPayload(user)] }));
    if (res.success && res.data) {
      setUser(res.data.info);
      handleShowAlertSuccess('Update successfully');
    } else {
      handleShowAlertError('Update successfully');
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
      <h2 className="user-name">{user?.email + '( ' + user?.companyName + ' )' || ''}</h2>
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
              <UserDetail
                listFieldRequired={['firstName', 'lastName', 'email', 'status']}
                onSave={hanlleUpdateUser}
                user={user}
              />
            </Tab>
            <Tab value={1} index={tab}>
              hihih
            </Tab>
          </div>
        ) : null}
      </div>
      <Snackbar open={alertSuccess !== ''} autoHideDuration={3000} onClose={handleCloseAlertSuccess}>
        <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
          {alertSuccess}
        </Alert>
      </Snackbar>
      <Snackbar open={alertError !== ''} autoHideDuration={3000} onClose={handleCloseAlertError}>
        <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
          {alertError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserDetailPage;
