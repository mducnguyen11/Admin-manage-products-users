import axios from 'axios';
import { API_PATHS } from 'configs/api';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { setLoading, stopLoading } from 'modules/admin/redux/loadingReducer';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { Alert, Snackbar } from '@mui/material';
import './new-product-page.scss';
import { formatProductDataToPayload } from 'modules/admin/ultis';
import ProductDetailForm from 'modules/admin/components/ProductDetailForm/ProductDetailForm';
import { AxiosFormDataConfig } from 'modules/common/components/AxiosConfig/AxiosConfig';
import { defaultProductValue, IProductDetailData } from 'models/admin/product';

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
    const ress = await axios.post(API_PATHS.createNewProduct, formData, AxiosFormDataConfig);
    console.log('create prodcut : ', ress);
    if (ress.data.success) {
      handleShowAlertSuccess();
      const ll = listImgUpload.map(async (a, i) => {
        console.log('start upload img : ', i);
        const formData = new FormData();
        formData.append('images[]', a.file);
        formData.append('productId', ress.data.data);
        formData.append('order', '0');
        return axios.post(API_PATHS.uploadProductImage, formData, AxiosFormDataConfig);
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

  console.log('redbner');
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
            'description',
            'price',
            'quantity',
            'shipping',
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
