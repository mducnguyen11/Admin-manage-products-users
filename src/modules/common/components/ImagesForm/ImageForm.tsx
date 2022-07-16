import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FormattedMessage } from 'react-intl';

import './ImagesForm.scss';
interface Props {
  listImages: string[];
  handleRemoveImages: Function;
  handleUploadImages: Function;
  error?: string;
  handleDrag: Function;
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
      console.log('fail image');
    }
  };
  console.log('redner L: ', props.listImages);
  function handleOnDragEnd(result: any) {
    console.log(result);
    props.handleDrag(result);
  }
  return (
    <div className="images-form">
      <div style={{ width: '430px' }} className="images-form-list">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="product_images" direction="horizontal">
            {(provided) => (
              <div
                style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {props.listImages.map((a: string, index) => {
                  return (
                    <Draggable key={a} draggableId={a} index={index}>
                      {(provided) => (
                        <div
                          className="image-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <img src={a} onError={(e) => (e.currentTarget.src = not_available_img_url)} />
                          <i
                            onClick={() => {
                              props.handleRemoveImages(a);
                            }}
                            className="image-item-remove-icon bx bx-x"
                          ></i>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
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
            )}
          </Droppable>
        </DragDropContext>
        {/* {props.listImages.map((a, i) => {
          return (
            <div key={i} className="image-item">
              <img src={a} onError={(e) => (e.currentTarget.src = not_available_img_url)} />
              <i
                onClick={() => {
                  props.handleRemoveImages(a);
                }}
                className="image-item-remove-icon bx bx-x"
              ></i>
            </div>
          );
        })} */}
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
