import './ManageProductsPage.scss';
import { API_PATHS } from 'configs/api';
import { defaultFilterProductValue, IFilterProduct, IFilterProductField, IProductTableItem } from 'models/product';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import ProductFilter from '../../components/ProductsFilter/ProductsFilter';
import TablePagination from '@mui/material/TablePagination';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import Button from 'modules/common/components/Button/Button';
import ProductsTable from 'modules/product/components/ProductsTable/ProductsTable';
import ModalButton from 'modules/common/components/ModalButton/ModalButton';

const ManageProducts = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listProducts, setListProducts] = useState<
    {
      select_checked: boolean;
      product: IProductTableItem;
      delete_checked: boolean;
    }[]
  >([]);
  const [filter, setFilter] = useState<IFilterProduct>(defaultFilterProductValue);
  const [listProductsChange, setListProductsChange] = useState<
    {
      currentValue: IProductTableItem;
      initialValue: IProductTableItem;
    }[]
  >([]);
  const [totalItem, setTotalItem] = useState(0);
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

  // func get data
  const getProducts = React.useCallback(async () => {
    dispatch(setLoading());

    const res = await dispatch(fetchThunk(API_PATHS.getProductsList, 'post', { ...filter }));
    if (res.data) {
      const ll = res.data.map((a: IProductTableItem, i: number) => {
        return {
          select_checked: false,
          product: a,
          delete_checked: false,
        };
      });
      setListProducts([...ll]);
      setTotalItem(Number(res.recordsFiltered));
    } else {
      handleShowAlertError('Have no product');
      setListProducts([]);
      setTotalItem(0);
    }
    dispatch(stopLoading());
  }, [filter, dispatch]);

  useEffect(() => {
    getProducts();
  }, []);
  const handleChangeProduct = useCallback(
    (newProduct: { select_checked: boolean; product: IProductTableItem; delete_checked: boolean }) => {
      const iz = listProducts.findIndex((a) => a.product.id == newProduct.product.id);
      const newListProduct = [...listProducts];
      let newListProductChange = [...listProductsChange];
      if (
        (iz >= 0 && newProduct.product.price !== newListProduct[iz].product.price) ||
        newProduct.product.amount !== newListProduct[iz].product.amount
      ) {
        const i = listProductsChange.findIndex((a) => a.initialValue.id == newProduct.product.id);
        if (i !== -1) {
          if (
            listProductsChange[i].initialValue.price == newProduct.product.price &&
            listProductsChange[i].initialValue.amount == newProduct.product.amount
          ) {
            newListProductChange = newListProductChange.filter((a) => a.initialValue.id !== newProduct.product.id);
          } else {
            newListProductChange[i].currentValue = { ...newProduct.product };
          }
        } else {
          newListProductChange.push({
            initialValue: { ...newListProduct[iz].product },
            currentValue: { ...newProduct.product },
          });
        }
      }
      newListProduct[iz] = {
        ...newProduct,
      };
      setListProducts(newListProduct);
      setListProductsChange(newListProductChange);
    },
    [dispatch, listProducts, listProductsChange],
  );

  const handleSelectAll = useCallback(
    (value: boolean) => {
      const newProductList = listProducts.map((item) => {
        return {
          ...item,
          select_checked: value,
        };
      });
      setListProducts([...newProductList]);
    },
    [listProducts],
  );
  const handleDeleteUser = async () => {
    const paramsPayload: { id: string; delete: number }[] = [];
    listProducts.forEach((item) => {
      if (item.delete_checked) {
        paramsPayload.push({
          id: item.product.id,
          delete: 1,
        });
      }
    });
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.deleteProductsbyIDArray, 'post', { params: paramsPayload }));
    await getProducts();
    if (res.data) {
      handleShowAlertSuccess('Delete successfully');
    } else {
      handleShowAlertError('Update fail');
    }
    dispatch(stopLoading());
  };
  const handleSaveProductsChange = async () => {
    const payload: { params: { id: string; price: string; stock: string }[] } = { params: [] };
    listProductsChange.forEach((a) => {
      payload.params.push({
        id: a.currentValue.id,
        price: a.currentValue.price,
        stock: a.currentValue.amount,
      });
    });
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.saveEditProducts, 'post', payload));
    dispatch(stopLoading());
    if (res.data && res.success) {
      setListProductsChange([]);
      getProducts();
      handleShowAlertSuccess('Update successfully');
    } else {
      handleShowAlertError('Update fail');
    }
  };
  const handleUpdateEnable = useCallback(
    async (id: string, enable: number) => {
      const params: { id: string; enable: number } = {
        id: id,
        enable: enable,
      };
      if (alert.open) {
        handleCloseAlert();
      }
      dispatch(setLoading());
      const res = await dispatch(fetchThunk(API_PATHS.editProduct, 'post', { params: [params] }));
      dispatch(stopLoading());
      getProducts();
      if (res.data) {
        handleShowAlertSuccess('Update successfully');
      } else {
        handleShowAlertError('Up date fail');
      }
    },
    [dispatch, getProducts],
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilter({
      ...filter,
      page: newPage + 1,
    });
  };
  const handleChangeFilter = useCallback(
    (a: IFilterProductField) => {
      setFilter({
        ...filter,
        ...a,
      });
    },
    [filter],
  );
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter({
      ...filter,
      count: parseInt(event.target.value, 10),
    });
  };
  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, [filter]);
  return (
    <div className="manage-products">
      <h2 className="title">Products</h2>
      <div className="manage-product-filter">
        <ProductFilter filter={filter} onChange={handleChangeFilter} />
      </div>
      <Link to="/pages/products/new-product">
        <Button className="btn-add-product">Add Product</Button>
      </Link>
      <ProductsTable
        handleSelectAll={handleSelectAll}
        handleChangeSort={handleChangeFilter}
        sort={filter.sort}
        order_by={filter.order_by}
        handleUpdateEnable={handleUpdateEnable}
        handleChangeData={handleChangeProduct}
        data={listProducts}
      />
      <div className="table-pagination">
        <TablePagination
          component="div"
          count={totalItem}
          page={filter.page - 1}
          onPageChange={handleChangePage}
          rowsPerPage={filter.count}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div className="btn-wrapper">
        <div className="bottom-btns">
          {listProducts.some((a) => a.delete_checked == true) ? (
            <>
              <ModalButton
                onClick={handleDeleteUser}
                name="Delete selected"
                modalTitle="Warning"
                modalContent="Make sure u want to deleted these products"
              />
            </>
          ) : (
            <>
              {listProductsChange.length > 0 ? (
                <>
                  <ModalButton
                    modalTitle="Warning"
                    name="Save changes"
                    modalContent="Confirm your update"
                    onClick={handleSaveProductsChange}
                    color="yellow"
                  />
                </>
              ) : (
                <Button disabled={true} color="yellow" className="btn-save-change">
                  Save changes
                </Button>
              )}
            </>
          )}

          {listProducts.some(
            (a: { select_checked: boolean; product: IProductTableItem; delete_checked: boolean }) =>
              a.select_checked == true,
          ) ? (
            <Button color="yellow" className="btn-export">
              Export Selected
            </Button>
          ) : (
            <Button color="yellow" className="btn-export">
              Export All
            </Button>
          )}
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

export default ManageProducts;
