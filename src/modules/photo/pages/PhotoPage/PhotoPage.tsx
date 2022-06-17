import { IPhotos, IPhoto } from 'models/photo';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import PhotoCardSkeleton from 'modules/photo/components/PhotoCardSkeleton/PhotoCardSkeleton';
import { setListPhotos, setMoreCompare, setPhotosLoading } from 'modules/photo/redux/photoReducer';
import './PhotoPage.scss';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
interface Props {}

const PhotoPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const photosFromReduxStore = useSelector((state: AppState) => {
    return state.photos.listPhotos;
  });
  const isLoading = useSelector((state: AppState) => {
    return state.photos.isLoading;
  });
  const compare = useSelector((state: AppState) => {
    return state.photos.compare;
  });
  const [photoList, setPhotoList] = useState<IPhoto[]>(new Array(compare || 5));
  useEffect(() => {
    if (photosFromReduxStore) {
      setPhotoList(photosFromReduxStore);
    }
  }, [dispatch, isLoading, photosFromReduxStore]);

  const handleRestore = () => {
    console.log('restore', photosFromReduxStore);
    setPhotoList(photosFromReduxStore || []);
  };
  const handleConfirm = () => {
    dispatch(setListPhotos(photoList));
  };

  const changePhotosList = (title: string, id: number) => {
    console.log('title + ' + title + 'id :' + id);
    const xx: IPhoto[] = [...photoList];
    const i = photoList?.findIndex((a) => a.id == id);
    if (i != undefined && i >= 0) {
      xx[i] = {
        ...xx[i],
        title: title,
      };
    }
    console.log('xx :', xx[0]);
    console.log('xx :', photosFromReduxStore);
    setPhotoList([...xx]);
  };
  useEffect(() => {
    const xx = () => {
      if (window.pageYOffset > document.body.clientHeight - screen.height - 30) {
        if (isLoading === false) {
          dispatch(setMoreCompare());
        }
      }
    };
    document.addEventListener('scroll', xx);
    return () => {
      document.removeEventListener('scroll', xx);
    };
  }, [isLoading]);

  const getPhotos = React.useCallback(async () => {
    console.log('dispathch start loading');
    dispatch(setPhotosLoading());
    const json = await dispatch(fetchThunk(API_PATHS.photoList + `?_page=1&_limit=${compare}`));
    if (json.length > 0) {
      const xx = [...json];
      dispatch(setListPhotos([...xx]));

      console.log('dispathed data :', xx);
    } else {
      console.log(json);
    }
    console.log('dispathch stop loading');
  }, [dispatch, compare]);

  return (
    <div className="photos-page">
      <div className="photos-page-btns">
        <button onClick={handleConfirm}>confirm all</button>
        <button onClick={handleRestore}>restore</button>
      </div>
      {!isLoading ? (
        <>
          {' '}
          {photoList.map((a, i) => {
            return <PhotoCard isLoading={isLoading} changeState={changePhotosList} item={a} key={i} />;
          })}
        </>
      ) : (
        <>
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
          <PhotoCardSkeleton />
        </>
      )}
      {/* {isLoading ? <h2 className="photos-page-loading"> Loading ....</h2> : null} */}
    </div>
  );
};

export default PhotoPage;
