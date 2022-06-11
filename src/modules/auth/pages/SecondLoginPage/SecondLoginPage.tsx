import React, { useState } from 'react';
import './SecondLoginPage.scss';
import logo from '../../../../logo-420-x-108.png';
import SecondLoginForm from '../../components/SecondLoginForm/SecondLoginForm';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { ILoginParams } from '../../../../models/auth';
import { API_PATHS } from '../../../../configs/api';
import { fetchThunk } from '../../../common/redux/thunk';
import { setUserInfo } from '../../redux/authReducer';
import { RESPONSE_STATUS_SUCCESS } from '../../../../utils/httpResponseCode';
import { ACCESS_TOKEN_KEY } from '../../../../utils/constants';
import Cookies from 'js-cookie';
import { replace } from 'connected-react-router';
import { ROUTES } from '../../../../configs/routes';
import { getErrorMessageResponse } from '../../../../utils';
interface Props {}

const SecondLoginPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = React.useCallback(
    async (values: ILoginParams) => {
      setErrorMessage('');
      setLoading(true);

      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, 'post', { email: values.email, password: values.password }),
      );

      setLoading(false);

      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
        Cookies.set(ACCESS_TOKEN_KEY, json.data.token, { expires: values.rememberMe ? 7 : undefined });
        dispatch(replace(ROUTES.home));
        return;
      }

      setErrorMessage(getErrorMessageResponse(json));
    },
    [dispatch],
  );

  return (
    <div className="secondloginpage container">
      <img className="secondloginpage-logo" src={logo} alt="" />
      <SecondLoginForm onLogin={onLogin} loading={loading} errorMessage={errorMessage} />
    </div>
  );
};

export default SecondLoginPage;
