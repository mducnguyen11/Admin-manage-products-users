import { API_PATHS } from 'configs/api';
import SelectForm from 'modules/admin/components/SelectForm/SelectForm';

import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  onChange: Function;
  errorMessage?: string;
}
const BrandForm = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<''>>>();
  const [listBrands, setListBrand] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const getBrandsList = useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getBrandsList, 'post'));
    setListBrand(res.data);
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
          key_name="brand_id"
          value={props.value}
          onChange={handleChange}
          options={listBrands}
          error={props.errorMessage}
        />
      </div>
    </div>
  );
};

export default BrandForm;
