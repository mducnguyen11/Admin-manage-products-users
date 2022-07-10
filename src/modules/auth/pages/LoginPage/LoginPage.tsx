import React, { useState } from 'react';
import './login-page.scss';
import logo from '../../../../logo-420-x-108.png';
import LoginForm from '../../components/LoginForm/LoginForm';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { ILoginParams } from '../../../../models/auth';
import { API_PATHS } from '../../../../configs/api';
import { fetchThunk } from '../../../common/redux/thunk';
import { setUserInfo } from '../../redux/authReducer';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';
import { getErrorMessageResponse } from '../../../../utils';
interface Props {}

const LoginPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);
      const res = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );
      console.log('res :', res);
      setLoading(false);
      if (res?.success) {
        dispatch(setUserInfo(res.user));
        Cookies.set(ACCESS_TOKEN_KEY, res.user_cookie);
        dispatch(replace(ROUTES.admin));
        return;
      } else {
        setErrorMessage(getErrorMessageResponse(res));
      }
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
