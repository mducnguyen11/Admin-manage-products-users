import './NewProductPage.scss';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { Alert, Snackbar } from '@mui/material';
import ProductDetailForm from 'modules/product/components/ProductDetailForm/ProductDetailForm';
import { AxiosFormDataConfig } from 'modules/common/AxiosConfig/AxiosConfig';
import { defaultProductValue, IProductDetailData } from 'models/product';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import { formatProductDataToPayload, validateProductDataToCreate } from 'modules/product/utils';

interface Props {}

const NewProductPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [alertError, setAlertError] = React.useState<string>('');
  const handleShowAlertError = (text: string) => {
    setAlertError(text);
  };
  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError('');
  };
  const sku: string = useMemo(() => {
    return Date.now() + '';
  }, []);
  const handleSaveProduct = async (product: IProductDetailData) => {
    dispatch(setLoading());
    const getListFiles = (array: { image: string; file?: any }[]): { image: string; file: any }[] => {
      const v: { image: string; file: any }[] = [];
      array.forEach((c) => {
        if (c.file !== undefined) {
          const x: { image: string; file: any } = { ...c, file: c.file };
          v.push(x);
        }
      });
      return v;
    };
    const listImgUpload = getListFiles(product.imagesOrder || []);
    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(formatProductDataToPayload(product)));
    const ress = await AxiosFormDataConfig.post(API_PATHS.createNewProduct, formData);
    if (ress.data.success) {
      const ll = listImgUpload.map(async (a, i) => {
        const formData = new FormData();
        formData.append('images[]', a.file);
        formData.append('productId', ress.data.data);
        formData.append('order', '0');
        return AxiosFormDataConfig.post(API_PATHS.uploadProductImage, formData);
      });
      try {
        await axios.all([...ll]);
        history.push('/pages/products/product-detail/' + ress.data.data);
      } catch (error) {
        handleShowAlertError('Up load image fail');
      }
    } else {
      handleShowAlertError('Can not create product fail');
    }
    dispatch(stopLoading());
  };
  return (
    <div className="new-product-page">
      <div className="new-product-page-back-btn">
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="bx bx-arrow-back"></i>{' '}
        </button>
      </div>
      <h2 className="title">Add product</h2>
      <div className="new-product-page-tabs-content">
        <ProductDetailForm
          onValidate={validateProductDataToCreate}
          actionName="Add product"
          onSave={handleSaveProduct}
          product={{ ...defaultProductValue, sku: sku }}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={alertError !== ''}
        autoHideDuration={3000}
        onClose={handleCloseAlertError}
      >
        <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
          {alertError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default memo(NewProductPage);
