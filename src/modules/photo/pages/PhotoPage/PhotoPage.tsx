import { IPhotos, IPhoto } from 'models/photo';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import PhotoPageSkeleton from 'modules/photo/components/PhotoPageSkeleton/PhotoPageSkeleton';
import {
  setListPhotos,
  setMoreCompare,
  setMorePhotos,
  comfirmListPhotos,
  resetListPhotos,
} from 'modules/photo/redux/photoReducer';
import './PhotoPage.scss';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
interface Props {}

const PhotoPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const photosFromReduxStore = useSelector((state: AppState) => {
    return state.photos.listPhotos;
  });
  const [isLoading, setIsLoading] = useState(false);

  console.log('photosFromReduxStore :', photosFromReduxStore);
  const getPhotos = React.useCallback(async () => {
    setIsLoading(true);
    // console.log('comapre : ', compare);
    const json = await dispatch(fetchThunk(API_PATHS.photoList + `?_start=0&_end=5`));
    if (json.length > 0) {
      const xx = [...json];
      dispatch(setListPhotos([...xx]));
    } else {
      console.log(json);
    }

    setIsLoading(false);
  }, [dispatch]);
  // func get more photo
  const getMorePhotos = React.useCallback(async () => {
    setIsLoading(true);

    const json = await dispatch(
      fetchThunk(
        API_PATHS.photoList + `?_start=${photosFromReduxStore.length}&_end=${photosFromReduxStore.length + 5}`,
      ),
    );
    if (json.length > 0) {
      const xx = [...json];
      dispatch(setMorePhotos([...xx]));
    } else {
      console.log(json);
    }
    console.log('dispathch stop loading');
    setIsLoading(false);
  }, [dispatch, photosFromReduxStore]);
  // get data
  useEffect(() => {
    getPhotos();
  }, []);
  const handleConfirm = () => {
    dispatch(comfirmListPhotos());
    alert('thanh cong');
  };
  const handleReset = () => {
    dispatch(resetListPhotos());
  };
  useEffect(() => {
    const xx = () => {
      if (window.pageYOffset > document.body.clientHeight - screen.height - 30) {
        if (isLoading === false) {
          getMorePhotos();
        }
      }
    };
    document.addEventListener('scroll', xx);
    return () => {
      document.removeEventListener('scroll', xx);
    };
  }, [isLoading]);

  return (
    <div className="photos-page">
      <div className="photos-page-btns">
        <button onClick={handleConfirm}>confirm all</button>
        <button onClick={handleReset}>reset</button>
        <button> cccc</button>
      </div>
      {isLoading ? (
        <>
          <PhotoPageSkeleton />
        </>
      ) : null}
      {photosFromReduxStore.map((a, i) => {
        return <PhotoCard key={i} item={a} />;
      })}
      {isLoading ? (
        <>
          <PhotoPageSkeleton />
        </>
      ) : null}
      {/* {isLoading ? <h2 className="photos-page-loading"> Loading ....</h2> : null} */}
    </div>
  );
};

export default PhotoPage;
