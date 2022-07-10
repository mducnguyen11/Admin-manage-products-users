import { Alert, Snackbar } from '@mui/material';
import { API_PATHS } from 'configs/api';
import { DèaultNewUserValue, IUserDetailData } from 'models/admin/user';
import UserDetail from 'modules/admin/pages/UserDetail/components/UserDetail/UserDetail';
import { setLoading, stopLoading } from 'modules/admin/redux/loadingReducer';
import { formatToUserPayloadCreate } from 'modules/admin/ultis';
import { fetchThunk } from 'modules/common/redux/thunk';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {}

const NewUser = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [alertSuccess, setAlertSuccess] = React.useState('');
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

  const handleCreateUser = async (a: IUserDetailData) => {
    console.log('create user :', a);
    try {
      dispatch(setLoading());
      const res = await dispatch(fetchThunk(API_PATHS.createNewUser, 'post', formatToUserPayloadCreate(a)));
      console.log('ress create :', res);
      dispatch(stopLoading());
      if (res.success) {
        handleShowAlertSuccess('User have created');
        setTimeout(() => {
          history.push('/pages/user/user-detail/' + res.data.info.profile_id);
        }, 500);
      } else {
        handleShowAlertError('Create user fail');
      }
    } catch (error) {
      handleShowAlertError('Create user fail');
    }
  };
  return (
    <div className="user-detail-page">
      <div className="user-detail-page-back-btn">
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          {' '}
          <i className="bx bx-arrow-back"></i>{' '}
        </button>
      </div>
      <h2 className="user-name">Create profile</h2>
      <div className="user-detail-content">
        <div className="user-detail">
          <UserDetail
            listFieldRequired={[
              'firstName',
              'lastName',
              'paymentRailsType',
              'email',
              'access_level',
              'password',
              'confirm_password',
              'status',
            ]}
            user={{ ...DèaultNewUserValue }}
            onSave={handleCreateUser}
          />
        </div>
      </div>
      <Snackbar open={alertSuccess !== ''} autoHideDuration={3000} onClose={handleCloseAlertSuccess}>
        <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
          Update successfully
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

export default NewUser;
