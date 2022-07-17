import './NewProductPage.scss';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import React, { memo } from 'react';
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
import { formatProductDataToPayload } from 'modules/product/utils';

interface Props {}

const NewProductPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertError, setAlertError] = React.useState<string>('');
  const handleShowAlertSuccess = () => {
    setAlertSuccess(true);
  };
  const handleShowAlertError = (a: string) => {
    setAlertError(a);
  };
  const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertSuccess(false);
  };
  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError('');
  };

  const handleSaveProduct = async (
    a: IProductDetailData,
    listImgUpload: {
      image: string;
      file: any;
    }[],
  ) => {
    dispatch(setLoading());
    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(formatProductDataToPayload(a)));
    const ress = await AxiosFormDataConfig.post(API_PATHS.createNewProduct, formData);

    if (ress.data.success) {
      handleShowAlertSuccess();
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
          listFieldRequired={[
            'vendor_id',
            'name',
            'brand_id',
            'condition',
            'categories',
            'price',
            'quantity',
            'images',
          ]}
          actionName="Add product"
          onSave={handleSaveProduct}
          product={{ ...defaultProductValue }}
        />
      </div>
      <Snackbar open={alertSuccess} autoHideDuration={3000} onClose={handleCloseAlertSuccess}>
        <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
          Update successfully
        </Alert>
      </Snackbar>
      <Snackbar open={alertError !== ''} autoHideDuration={3000} onClose={handleCloseAlertError}>
        <Alert onClose={handleCloseAlertError} severity="error" sx={{ width: '100%' }}>
          {alertError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default memo(NewProductPage);
