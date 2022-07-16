import ImageForm from 'modules/common/components/ImagesForm/ImageForm';
import React, { memo } from 'react';

interface Props {
  listImagesCurrent: {
    id: string;
    file: string;
    thumbs: string[];
  }[];
  errorMessage?: string;
  onChange: Function;
  deleted_images: number[];
  listImagesOrder: { image: string; file?: any }[];
}

const ProductImages = (props: Props) => {
  const handleRemoveImage = (fileName: string) => {
    const i = props.listImagesCurrent.findIndex((b) => b.file == fileName);
    if (i > -1) {
      props.onChange({
        images: props.listImagesCurrent.filter((a) => a.file !== props.listImagesCurrent[i].file),
        deleted_images: [...props.deleted_images, Number(props.listImagesCurrent[i].id)],
        imagesOrder: props.listImagesOrder.filter((a) => a.image !== fileName),
      });
    } else {
      props.onChange({
        imagesOrder: props.listImagesOrder.filter((a) => a.image !== fileName),
      });
    }
  };
  const handleUploadImages = (array: { image: string; file: any }[]) => {
    props.onChange({
      images: props.listImagesCurrent,
      imagesOrder: [...props.listImagesOrder, ...array],
    });
  };
  const getlistImagesToShow = () => {
    return [...props.listImagesOrder.map((a) => a.image)];
  };
  const handleArrangeImages = (sourceIndex: number, newIndex: number) => {
    const tt: { image: string; file?: any }[] = [];
    console.log('sourece :', sourceIndex, newIndex);
    const ar = [...props.listImagesOrder];
    if (sourceIndex > newIndex) {
      for (let i = 0; i < newIndex; i++) {
        tt[i] = ar[i];
      }
      tt[newIndex] = ar[sourceIndex];
      for (let i = newIndex + 1; i <= sourceIndex; i++) {
        tt[i] = ar[i - 1];
      }
      for (let i = sourceIndex + 1; i < ar.length; i++) {
        tt[i] = ar[i];
      }
    } else {
      for (let i = 0; i < sourceIndex; i++) {
        tt[i] = ar[i];
      }
      for (let i = sourceIndex; i < newIndex; i++) {
        tt[i] = ar[i + 1];
      }
      tt[newIndex] = ar[sourceIndex];
      for (let i = newIndex + 1; i < props.listImagesOrder.length; i++) {
        tt[i] = ar[i];
      }
    }
    props.onChange({
      images: props.listImagesCurrent,
      imagesOrder: [...tt],
    });
  };
  return (
    <div className=" product-detail-row product-detail-images">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Images</p>
      </div>
      <div className=" product-detail-row-input product-detail-vendor-input">
        <ImageForm
          handleDrag={handleArrangeImages}
          error={props.errorMessage}
          listImages={getlistImagesToShow()}
          handleRemoveImages={handleRemoveImage}
          handleUploadImages={handleUploadImages}
        />
      </div>
    </div>
  );
};

export default memo(ProductImages);
