import React from 'react';
import './App.css';
import { Routes } from './Routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchThunk } from './modules/common/redux/thunk';
import { API_PATHS } from './configs/api';
import { RESPONSE_STATUS_SUCCESS } from './utils/httpResponseCode';
import { setUserInfo } from './modules/auth/redux/authReducer';
import { setListPhotos } from './modules/photo/redux/photoReducer';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));

  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    console.log('user :', user, accessToken);
    if (accessToken && !user) {
      console.log('get user ');
      const json = await dispatch(fetchThunk(API_PATHS.getCommonRole, 'post'));
      console.log(json.user);
      if (json?.success) {
        dispatch(setUserInfo(json.user));
      }
    }
  }, [dispatch, user]);

  // const getPhotos = React.useCallback(async () => {
  //   console.log('dispathch start loading');
  //   dispatch(setPhotosLoading());
  //   const json = await dispatch(fetchThunk(API_PATHS.photoList + `?_page=1&_limit=${compare}`));
  //   if (json.length > 0) {
  //     const xx = [...json];
  //     dispatch(setListPhotos([...xx]));

  //     console.log('dispathed data :', xx);
  //   } else {
  //     console.log(json);
  //   }
  //   console.log('dispathch stop loading');
  // }, [dispatch, compare]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
