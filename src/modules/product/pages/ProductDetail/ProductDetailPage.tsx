import './ProductDetailPage.scss';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import { IProductDetailData } from 'models/product';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';

import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import { Alert, AlertColor, Snackbar } from '@mui/material';

import { AxiosFormDataConfig } from 'modules/common/AxiosConfig/AxiosConfig';
import ProductDetailForm from 'modules/product/components/ProductDetailForm/ProductDetailForm';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import { formatProductDataToPayload, validateProductDataToUpdate } from 'modules/product/utils';
import Tab from 'modules/common/components/Tab/Tab';

interface Props {}
const ProductDetail = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const params = useParams<{ id: string }>();
  const [tab, setTab] = React.useState(0);
  const history = useHistory();
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
  const [product, setProduct] = useState<IProductDetailData>();
  const getProductDetail = useCallback(async () => {
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.getProductDetail, 'post', { id: params.id }));
    if (res.data && res.success) {
      setProduct(res.data);
      console.log('product : ', res.data);
    } else {
      history.replace('/error');
    }
    dispatch(stopLoading());
  }, [params.id]);
  useEffect(() => {
    getProductDetail();
  }, [params.id]);

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
    const listPromiseImgUpload = listImgUpload.map(async (image, i) => {
      const formData = new FormData();
      formData.append('images[]', image.file);
      formData.append('productId', product.id || '');
      formData.append('order', '0');
      return AxiosFormDataConfig.post(API_PATHS.uploadProductImage, formData);
    });
    try {
      await axios.all([...listPromiseImgUpload]);
    } catch (error) {
      handleShowAlertError('Up load image fail');
    }
    const formData = new FormData();
    formData.append('productDetail', JSON.stringify(formatProductDataToPayload(product)));
    const ress = await AxiosFormDataConfig.post(API_PATHS.saveProduct, formData);
    console.log(ress);
    if (ress.data.success) {
      getProductDetail();
      handleShowAlertSuccess('Update successfully');
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
      <h2 className="product-name">{product?.name ? product?.name : ''}</h2>
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
                onValidate={validateProductDataToUpdate}
              />
            ) : null}
          </Tab>
          <Tab value={1} index={tab}>
            <h2>Others Tab</h2>
          </Tab>
        </div>
      </div>
      {alert.open ? (
        <Snackbar open={true} autoHideDuration={3000} onClose={handleCloseAlert}>
          <Alert onClose={handleCloseAlert} severity={alert.type} sx={{ width: '100%' }}>
            {alert.text}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  );
};

export default memo(ProductDetail);
