import './NewUser.scss';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { API_PATHS } from 'configs/api';
import { DefaultNewUserValue, IUserDetailData } from 'models/user';
import UserDetailForm from 'modules/user/components/UserDetailForm/UserDetailForm';
import { fetchThunk } from 'modules/common/redux/thunk';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import { formatToUserPayloadCreate } from 'modules/user/utils';

const NewUser = () => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
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
      {alert.open ? (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
            {alert.text}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default NewUser;
