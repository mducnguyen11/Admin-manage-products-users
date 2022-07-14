import './NewUser.scss';
import { Alert, Snackbar } from '@mui/material';
import { API_PATHS } from 'configs/api';
import { DefaultNewUserValue, IUserDetailData } from 'models/admin/user';
import UserDetailForm from 'modules/admin/components/UserDetailForm/UserDetailForm';
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
  const handleShowAlertSuccess = (text: string) => {
    setAlertSuccess(text);
  };
  const handleShowAlertError = (text: string) => {
    setAlertError(text);
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

  const handleCreateUser = async (newUser: IUserDetailData) => {
    try {
      dispatch(setLoading());
      const res = await dispatch(fetchThunk(API_PATHS.createNewUser, 'post', formatToUserPayloadCreate(newUser)));
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
          <UserDetailForm
            listFieldRequired={[
              'firstName',
              'lastName',
              'paymentRailsType',
              'email',
              'access_level',
              'password',
              'confirm_password',
            ]}
            actionName="Create user"
            user={{ ...DefaultNewUserValue }}
            onSave={handleCreateUser}
          />
        </div>
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

export default NewUser;
