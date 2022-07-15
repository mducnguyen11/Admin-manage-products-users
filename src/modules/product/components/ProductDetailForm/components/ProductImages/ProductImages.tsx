import ImageForm from 'modules/common/components/ImagesForm/ImageForm';
import React, { memo } from 'react';

interface Props {
  listImagesCurrent: {
    id: string;
    file: string;
    thumbs: string[];
  }[];
  listImgUpload: {
    image: string;
    file: any;
  }[];
  changeImagesUpload: Function;
  errorMessage?: string;
  onChange: Function;
  deleted_images: number[];
}

const ProductImages = (props: Props) => {
  const handleChangeListImagesCurrent = (a: {
    images: {
      id: string;
      file: string;
      thumbs: string[];
    }[];
    deleted_images: number[];
  }) => {
    props.onChange(a);
  };
  const handleChangeListImagesUpload = (
    a: {
      image: string;
      file: any;
    }[],
  ) => {
    props.changeImagesUpload(a);
  };

  return (
    <div className=" product-detail-row product-detail-images">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Images</p>
      </div>
      <div className=" product-detail-row-input product-detail-vendor-input">
        <ImageForm
          error={props.errorMessage}
          deleted_images={props.deleted_images}
          changeListImagesCurrent={handleChangeListImagesCurrent}
          listImgUpload={props.listImgUpload}
          changeImagesUpload={handleChangeListImagesUpload}
          listImagesCurrent={props.listImagesCurrent}
        />
      </div>
    </div>
  );
};

export default memo(ProductImages);
