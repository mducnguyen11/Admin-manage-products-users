import { IPhoto } from 'models/photo';
import { changePhoto } from 'modules/photo/redux/photoReducer';
import React, { memo } from 'react';
import { useState, useRef, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import './PhotoCard.scss';

interface Props {
  item: IPhoto;
  changeState?: Function;
  isLoading?: boolean;
}
const PhotoCard = (props: Props) => {
  const isLoading = false;
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const item = props.item;
  const [title, setTitle] = useState('');

  const titleRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    setTitle(item.title);
  }, [item]);

  return (
    <div className={`photo-card  ${item.id % 2 == 0 ? 'bg-gray' : ''}`}>
      <div className="photo-card-avt">
        {!isLoading ? (
          <img className="photo-card-avt" src={item.thumbnailUrl} alt="" />
        ) : (
          <Skeleton width={150} height={150} />
        )}
      </div>
      <div className="photo-card-content">
        {!isLoading ? (
          <div className="photo-card-title">
            {!isEdit ? (
              <label
                ref={titleRef}
                onMouseMove={() => {
                  titleRef.current?.classList.add('show-border');
                }}
                onMouseLeave={() => {
                  titleRef.current?.classList.remove('show-border');
                }}
                onClick={() => {
                  setIsEdit(!isEdit);
                }}
              >
                {item.title}
              </label>
            ) : (
              <input
                // ref={inputRef}
                onBlur={(e) => {
                  // props.changeState(title, item.id);

                  dispatch(
                    changePhoto({
                      ...item,
                      title: title,
                    }),
                  );

                  setIsEdit(!isEdit);
                }}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                autoFocus
              />
            )}
          </div>
        ) : (
          <Skeleton className="photo-card-title" width={600} height={10} />
        )}
        <div>
          {!isLoading ? (
            <span className="photo-card-time">{Date.now()}</span>
          ) : (
            <Skeleton className="photo-card-time" width={120} height={10} />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(PhotoCard);
