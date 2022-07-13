import { API_PATHS } from 'configs/api';
import { ROUTES } from 'configs/routes';
import { replace } from 'connected-react-router';
import Cookies from 'js-cookie';
import { ILoginParams } from 'models/auth';
import LoginForm from 'modules/auth/components/LoginForm/LoginForm';
import { setUserInfo } from 'modules/auth/redux/authReducer';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { getErrorMessageResponse } from 'utils';
import { ACCESS_TOKEN_KEY } from 'utils/constants';
import logo from 'logo-420-x-108.png';
import './login-page.scss';

interface Props {}

const LoginPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setLoading(true);
      try {
        const res = await dispatch(
          fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
        );
        if (res?.success) {
          dispatch(setUserInfo(res.user));
          Cookies.set(ACCESS_TOKEN_KEY, res.user_cookie);
          dispatch(replace(ROUTES.admin));
          return;
        } else {
          setErrorMessage(getErrorMessageResponse(res));
        }
      } catch (error) {
        console.log('');
      }
      setLoading(false);
    },

    [dispatch],
  );

  return (
    <div className="login-page container">
      <img className="secondloginpage-logo" src={logo} alt="" />
      <LoginForm loading={loading} onLogin={onLogin} errorMessage={errorMessage} />
    </div>
  );
};

export default LoginPage;
