import './NewProductPage.scss';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import React, { memo, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import ProductDetailForm from 'modules/product/components/ProductDetailForm/ProductDetailForm';
import { AxiosFormDataConfig } from 'modules/common/AxiosConfig/AxiosConfig';
import { defaultProductValue, IProductDetailData } from 'models/product';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import { formatProductDataToPayload, validateProductDataToCreate } from 'modules/product/utils';
import { string } from 'yup';

interface Props {}

const NewProductPage = (props: Props) => {
  const history = useHistory();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [alert, setAlert] = React.useState<{
    open: boolean;
    type: AlertColor;
    text: string;
  }>({
    open: false,
    type: 'success',
    text: '',
  });
  const handleShowAlertSuccess = (text: string) => {
    setAlert({
      open: true,
      type: 'success',
      text: text,
    });
  };
  const handleShowAlertError = (text: string) => {
    setAlert({
      open: true,
      type: 'error',
      text: text,
    });
  };
  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert({
      open: false,
      type: 'error',
      text: '',
    });
  };
  const sku: string = useMemo(() => {
    return Date.now() + '';
  }, []);
  const handleSaveProduct = async (product: IProductDetailData) => {
    dispatch(setLoading());
    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(formatProductDataToPayload(product)));
    const ress = await AxiosFormDataConfig.post(API_PATHS.createNewProduct, formData);
    if (ress.data.success) {
      if (product.imagesOrder) {
        const listImgUpload: { image: string; file: any }[] = [];
        product.imagesOrder.forEach((imageFile) => {
          if (imageFile.file !== undefined) {
            const x: { image: string; file: any } = { ...imageFile, file: imageFile.file };
            listImgUpload.push(x);
          }
        });
        const ll = listImgUpload.map(async (a, i) => {
          const formData = new FormData();
          formData.append('images[]', a.file);
          formData.append('productId', ress.data.data);
          formData.append('order', '0');
          return AxiosFormDataConfig.post(API_PATHS.uploadProductImage, formData);
        });
        try {
          await axios.all([...ll]);
          handleShowAlertSuccess('Product have been created');
          setTimeout(() => {
            history.push('/pages/products/product-detail/' + ress.data.data);
          }, 500);
        } catch (error) {
          handleShowAlertError('Up load image fail');
        }
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
      {alert.open ? (
        <Snackbar
          // anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={true}
          autoHideDuration={3000}
          onClose={handleCloseAlert}
        >
          <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
            {alert.text}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default memo(NewProductPage);
