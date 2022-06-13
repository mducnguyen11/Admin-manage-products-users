import React, { useState } from 'react';
import logo from '../../../../logo-420-x-108.png';
import RegisterForm from 'modules/auth/components/RegisterForm/RegisterForm';
interface Props {}
import './RegisterPage.scss';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { replace } from 'connected-react-router';
import { IRegisterParams } from 'models/auth';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import { RESPONSE_STATUS_SUCCESS } from 'utils/httpResponseCode';
import { ROUTES } from 'configs/routes';
import { AppState } from 'redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';

const RegisterPage = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const onSignUp = async (values: IRegisterParams) => {
    setErrorMessage('');
    setLoading(true);
    const res = await axios.post('http://api.training.div3.pgtest.co/api/v1/auth/register', values);
    setLoading(false);
    console.log(res);
    if (res?.data.code === 200) {
      dispatch(replace(ROUTES.login));
    }

    setErrorMessage(res.data.message);
  };

  return (
    <div className="register-page container">
      <RegisterForm loading={loading} onRegister={onSignUp} />
    </div>
  );
};

export default RegisterPage;
