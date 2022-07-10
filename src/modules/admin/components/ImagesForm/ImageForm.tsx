import React from 'react';

import './images-form.scss';
interface Props {
  listImagesCurrent: {
    id: string;
    file: string;
    thumbs: string[];
  }[];
  changeImagesUpload: Function;
  listImgUpload: {
    image: string;
    file: any;
  }[];
  changeListImagesCurrent: Function;
  deleted_images: number[];
}
const not_available_img_url = 'https://admin.gearfocus.div4.pgtest.co/assets/images/no-image-icon.png';

const ImageForm = (props: Props) => {
  const handleRemoveImgCurrent = (id: string) => {
    props.changeListImagesCurrent({
      images: props.listImagesCurrent.filter((a) => a.id !== id),
      deleted_images: [...props.deleted_images, Number(id)],
    });
  };
  const handleUploadImage = async (e: any) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState == 2) {
          if (typeof reader.result == 'string') {
            props.changeImagesUpload([
              ...props.listImgUpload,
              {
                image: reader.result,
                file: e.target.files[0],
              },
            ]);
          }
        }
      };
    } catch (error) {
      console.log('fail image');
    }
  };
  const handleRemoveImgupload = (a: string) => {
    props.changeImagesUpload(props.listImgUpload.filter((b) => b.image !== a));
  };
  return (
    <div className="images-form">
      <div className="images-form-list">
        {props.listImagesCurrent.map((a, i) => {
          return (
            <div key={i} className="image-item">
              <img src={a.thumbs[0]} onError={(e) => (e.currentTarget.src = not_available_img_url)} />
              <i
                onClick={() => {
                  handleRemoveImgCurrent(a.id);
                }}
                className="image-item-remove-icon bx bx-x"
              ></i>
            </div>
          );
        })}
        {props.listImgUpload.map((a: { image: string; file: any }, i) => {
          return (
            <div key={i} className="image-item">
              <img src={a.image} onError={(e) => (e.currentTarget.src = not_available_img_url)} />
              <i
                onClick={() => {
                  handleRemoveImgupload(a.image);
                }}
                className="image-item-remove-icon bx bx-x"
              ></i>
            </div>
          );
        })}
        <div className="image-item images-form-add">
          <i className="bx bxs-camera"></i>
          <input
            accept=".jpg,.jpeg,.gif,.png"
            onChange={handleUploadImage}
            className="images-form-add-input"
            type="file"
          />
          {/* <i onClick={handleRemoveImg} className="image-item-remove-icon bx bx-x"></i> */}
        </div>
      </div>
    </div>
  );
};

export default ImageForm;
