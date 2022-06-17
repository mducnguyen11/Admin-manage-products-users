import React, { memo } from 'react';
import { useState, useRef, useEffect } from 'react';
import './PhotoCard.scss';

interface IPhoto {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface Props {
  item: IPhoto;
  changeState: Function;
}
const PhotoCard = (props: Props) => {
  const [isEdit, setIsEdit] = useState<Boolean>(false);
  const item = props.item;
  const [title, setTitle] = useState(props.item.title);
  useEffect(() => {
    setTitle(item.title);
  }, [item.title]);
  const titleRef = useRef<HTMLLabelElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className={`photo-card  ${item.id % 2 == 0 ? 'bg-gray' : ''}`}>
      <div className="photo-card-img">
        <img src={item.thumbnailUrl} alt="" />
      </div>
      <div className="photo-card-content">
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
              className={!isEdit ? '' : 'dp-none'}
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {item.title}
            </label>
          ) : (
            <input
              ref={inputRef}
              onBlur={() => {
                props.changeState(inputRef.current?.value, item.id);
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
        <div>
          <span>{Date.now()}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(PhotoCard);
