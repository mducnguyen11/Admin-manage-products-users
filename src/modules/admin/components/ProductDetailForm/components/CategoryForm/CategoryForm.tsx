import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from 'modules/common/redux/thunk';
import { API_PATHS } from 'configs/api';
import Checkmarks from 'modules/admin/components/Checkmarks/Checkmarks';
interface Props {
  value: {
    id: string;
    name: string;
    [key: string]: any;
  }[];
  onChange: Function;
  errorMessage?: string;
}

const CategoryForm = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<''>>>();
  const [listCategory, setlistCategory] = useState<
    {
      id: string;
      name: string;
      parentId: string;
      path: string;
      pos: string;
    }[]
  >([]);
  const getCategoryList = useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCategoriesList, 'post'));
    setlistCategory(res.data);
  }, []);
  useEffect(() => {
    getCategoryList();
  }, []);
  const handleChange = (a: {
    [key: string]: {
      id: string;
      name: string;
      [key: string]: any;
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

export default CategoryForm;
