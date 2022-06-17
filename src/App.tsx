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
import { setListPhotos, setPhotosLoading, stopPhotosLoading } from './modules/photo/redux/photoReducer';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));
  const photosFromReduxStore = useSelector((state: AppState) => {
    return state.photos.listPhotos;
  });
  const isLoading = useSelector((state: AppState) => {
    return state.photos.isLoading;
  });
  const { compare } = useSelector((state: AppState) => ({
    compare: state.photos.compare,
  }));

  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    if (accessToken && !user) {
      const json = await dispatch(fetchThunk(API_PATHS.userProfile));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo({ ...json.data, token: accessToken }));
      }
    }
  }, [dispatch, user]);

  const getPhotos = React.useCallback(async () => {
    console.log('dispathch start loading');
    dispatch(setPhotosLoading());
    const json = await dispatch(fetchThunk(API_PATHS.photoList));
    if (json.length > 0) {
      const xx = [...json].slice(0, compare);
      dispatch(setListPhotos([...xx]));

      console.log('dispathed data :', xx);
    } else {
      console.log(json);
    }
    console.log('dispathch stop loading');
  }, [dispatch, compare]);

  React.useEffect(() => {
    getProfile();
    getPhotos();
  }, [compare, getProfile, getPhotos]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
