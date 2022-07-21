import React, { memo } from 'react';

import { useSelector } from 'react-redux';

import { AppState } from 'redux/reducer';

import Checkmarks from 'modules/common/components/Checkmarks/Checkmarks';
import { IProductDetailDataField } from 'models/product';

interface Props {
  value: {
    id: string;
    name: string;
    [key: string]: any;
  }[];
  onChange: (value: IProductDetailDataField) => void;
  errorMessage?: string;
}

const CategoryForm = (props: Props) => {
  const listCategory = useSelector((state: AppState) => state.categories.categories);
  const handleChange = (a: {
    [key: string]: {
      id: string;
      name: string;
    }[];
  }) => {
    props.onChange({
      categories: [
        ...a.categories.map((b) => {
          return {
            category_id: b.id,
            name: b.name,
          };
        }),
      ],
    });
  };
  return (
    <div className="product-detail-row product-detail-category ">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Category</p>
      </div>
      <div className="product-detail-row-input product-detail-category-input">
        <Checkmarks
          className="product-detail-row-input-input-form select-form"
          key_name="categories"
          value={props.value}
          onChange={handleChange}
          options={listCategory}
          error={props.errorMessage}
        />
      </div>
    </div>
  );
};

export default memo(CategoryForm);
