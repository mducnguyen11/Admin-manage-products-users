import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ListManager } from 'react-beautiful-dnd-grid';

import './ImagesForm.scss';
interface Props {
  listImages: string[];
  handleRemoveImages: (image: string) => void;
  handleUploadImages: (listImagesUpload: { image: string; file: any }[]) => void;
  error?: string;
  handleDrag: (sourceIndex: number, newIndex: number) => void;
}
const not_available_img_url = 'https://admin.gearfocus.div4.pgtest.co/assets/images/no-image-icon.png';

const ImageForm = (props: Props) => {
  const handleUploadImage = async (e: any) => {
    const listImagesUploaded: any[] = [];
    try {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        listImagesUploaded.push({
          image: URL.createObjectURL(files[i]),
          file: files[i],
        });
      }
      props.handleUploadImages([...listImagesUploaded]);
    } catch (error) {
      console.log('erorr');
    }
  };
  function handleOnDragEnd(sourceIndex: number, newIndex: number) {
    props.handleDrag(sourceIndex, newIndex);
  }

  return (
    <div className="images-form">
      <div className="images-form-list">
        <ListManager
          items={props.listImages}
          direction="horizontal"
          maxItems={4}
          render={(item) => (
            <div className="image-item">
              <img src={item} onError={(e) => (e.currentTarget.src = not_available_img_url)} />
              <i
                onClick={() => {
                  props.handleRemoveImages(item);
                }}
                className="image-item-remove-icon bx bx-x"
              ></i>
            </div>
          )}
          onDragEnd={handleOnDragEnd}
        />
        <div className="image-item images-form-add">
          <i className="bx bxs-camera"></i>
          <input
            accept=".jpg,.jpeg,.gif,.png"
            onChange={handleUploadImage}
            className="images-form-add-input"
            type="file"
            multiple
          />
        </div>
      </div>
      {props.error ? (
        <div className="images-form-error-message">
          <span className="error-message">
            <FormattedMessage id={props.error} />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default ImageForm;
