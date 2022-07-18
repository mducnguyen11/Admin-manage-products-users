import { API_PATHS } from 'configs/api';
import { IProductDetailDataField } from 'models/product';
import SelectForm from 'modules/common/components/SelectForm/SelectForm';

import { fetchThunk } from 'modules/common/redux/thunk';
import React, { memo, useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  onChange: (value: IProductDetailDataField) => void;
  errorMessage?: string;
}
const ProductBrand = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<''>>>();
  const [listBrands, setListBrand] = useState<
    {
      value: string;
      name: string;
    }[]
  >([]);
  const getBrandsList = useCallback(async () => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.getBrandsList, 'post'));
      setListBrand(
        res.data.map((a: { id: string; name: string; [key: string]: any }) => {
          return {
            value: a.id,
            name: a.name,
          };
        }),
      );
    } catch (error) {
      setListBrand([]);
    }
  }, []);

  const handleChange = (a: { brand_id: string }) => {
    props.onChange(a);
  };
  useEffect(() => {
    getBrandsList();
  }, []);
  return (
    <div className="product-detail-brand product-detail-row">
      <div className="product-detail-row-name">
        <p className="product-detail-row-name-p">Brand</p>
      </div>
      <div className="product-detail-row-input product-detail-brand-input">
        <SelectForm
          className="select-form product-detail-row-input-input-form"
          value={props.value}
          onChange={(value: string) => {
            handleChange({
              brand_id: value,
            });
          }}
          options={listBrands}
          error={props.errorMessage}
        />
      </div>
    </div>
  );
};

export default memo(ProductBrand);
