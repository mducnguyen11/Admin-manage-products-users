import './product-detail-page.scss';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import { IProductDetailData } from 'models/admin/product';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { setLoading, stopLoading } from 'modules/admin/redux/loadingReducer';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import ProductAttactments from './components/ProductAttachments/ProductAttactments';
import ProductDetailForm from '../../components/ProductDetailForm/ProductDetailForm';
import Tab from 'modules/admin/components/Tab/Tab';
import { Alert, Snackbar } from '@mui/material';

import { formatProductDataToPayload } from 'modules/admin/ultis';
import { AxiosFormDataConfig } from 'modules/common/components/AxiosConfig/AxiosConfig';

interface Props {}
const ProductDetail = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params = useParams<{ id: string }>();
  const [tab, setTab] = React.useState(0);
  const history = useHistory();
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
  const [product, setProduct] = useState<IProductDetailData>();
  const getProductDetail = useCallback(async () => {
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.getProductDetail, 'post', { id: params.id }));
    if (res.data && res.success) {
      console.log('Get Product :', res);
      setProduct(res.data);
    } else {
      history.replace('/error');
    }
    dispatch(stopLoading());
  }, [params.id]);
  useEffect(() => {
    getProductDetail();
  }, [params.id]);

  const handleSaveProduct = async (
    p: IProductDetailData,
    listImgUpload: {
      image: string;
      file: any;
    }[],
  ) => {
    dispatch(setLoading());
    const ll = listImgUpload.map(async (a, i) => {
      console.log('start upload img : ', i);
      const formData = new FormData();
      formData.append('images[]', a.file);
      formData.append('productId', p.id || '');
      formData.append('order', '0');
      return axios.post(API_PATHS.uploadProductImage, formData, AxiosFormDataConfig);
    });
    try {
      await axios.all([...ll]);
    } catch (error) {
      handleShowAlertError('Up load image fail');
    }
    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(formatProductDataToPayload(p)));
    const ress = await axios.post(API_PATHS.saveProduct, formData, AxiosFormDataConfig);
    console.log('Update res :', ress);
    if (ress.data.success) {
      getProductDetail();
      handleShowAlertSuccess();
    } else {
      handleShowAlertError('Update product fail');
    }
    dispatch(stopLoading());
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-page-back-btn">
        <button
          onClick={() => {
            history.goBack();
          }}
        >
          {' '}
          <i className="bx bx-arrow-back"></i>{' '}
        </button>
      </div>
      <h2 className="product-name">{product?.name || ''}</h2>
      <div className="product-detail-content">
        <div className="product-detail-page-tabs-navigation">
          <p onClick={() => setTab(0)} className={tab == 0 ? 'tab-active' : ''}>
            Info
          </p>
          <p onClick={() => setTab(1)} className={tab == 1 ? 'tab-active' : ''}>
            Atachments
          </p>
        </div>
        <div className="product-detail-page-tabs-content">
          <Tab value={0} index={tab}>
            {product ? (
              <ProductDetailForm
                onSave={handleSaveProduct}
                actionName="Save product"
                product={product}
                listFieldRequired={[
                  'name',
                  'images',
                  'quantity',
                  'brand',
                  'categories',
                  'description',
                  'price',
                  'shipping',
                ]}
              />
            ) : null}
          </Tab>
          <Tab value={1} index={tab}>
            <ProductAttactments />
          </Tab>
        </div>
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

export default memo(ProductDetail);
