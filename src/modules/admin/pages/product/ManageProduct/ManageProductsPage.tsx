import './manage-product.scss';
import { API_PATHS } from 'configs/api';
import {
  defaultFilterProductValue,
  IFilterProduct,
  IFilterProductField,
  IProductTableItem,
} from 'models/admin/product';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import ProductFilter from './components/ProductFilter/ProductFilter';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TablePagination from '@mui/material/TablePagination';
import { Alert, Snackbar } from '@mui/material';
import { setLoading, stopLoading } from 'modules/admin/redux/loadingReducer';
import Table from './components/Table/Table';
import Button from 'modules/admin/components/Button/Button';
interface Props {}

const ManageProducts = (props: Props) => {
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
  const [openSaveModal, setOpenSaveModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [alertSuccess, setAlertSuccess] = React.useState(false);
  const [alertError, setAlertError] = React.useState<string>('');
  const [totalItem, setTotalItem] = useState(0);
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
  }, [setListProducts, filter]);

  //useEfffect get data
  useEffect(() => {
    getProducts();
  }, []);
  const handleChangeProduct = (newProduct: {
    select_checked: boolean;
    product: IProductTableItem;
    delete_checked: boolean;
  }) => {
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
  };
  const handleSelectAll = (g: boolean) => {
    const xx = listProducts.map((a) => {
      return {
        ...a,
        select_checked: g,
      };
    });
    setListProducts([...xx]);
  };
  const handleDeleteUser = async () => {
    const xx: { id: string; delete: number }[] = [];
    setOpenDeleteModal(false);
    listProducts.forEach((a) => {
      if (a.delete_checked) {
        xx.push({
          id: a.product.id,
          delete: 1,
        });
      }
    });
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.deleteProductsbyIDArray, 'post', { params: xx }));
    await getProducts();
    if (res.data) {
      handleShowAlertSuccess();
    } else {
      handleShowAlertError('Update fail');
    }
    dispatch(stopLoading());
  };
  const handleSaveChange = async () => {
    setOpenSaveModal(false);
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
    if (res.data && res.success) {
      setListProductsChange([]);
      getProducts();
      handleShowAlertSuccess();
    } else {
      handleShowAlertError('Update fail');
    }

    dispatch(stopLoading());
  };
  const handleUpdateEnable = async (productData: {
    select_checked: boolean;
    product: IProductTableItem;
    delete_checked: boolean;
  }) => {
    const xx: { id: string; enable: number } = {
      id: productData.product.id,
      enable: Number(productData.product.enabled),
    };
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.editProduct, 'post', { params: [xx] }));
    dispatch(stopLoading());
    getProducts();
    if (res.data) {
      handleShowAlertSuccess();
    } else {
      handleShowAlertError('Up date fail');
    }
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilter({
      ...filter,
      page: newPage + 1,
    });
  };
  const handleChangeFilter = (a: IFilterProductField) => {
    setFilter({
      ...filter,
      ...a,
    });
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter({
      ...filter,
      count: parseInt(event.target.value, 10),
    });
  };
  useEffect(() => {
    getProducts();
  }, [filter]);
  return (
    <div className="manage-products">
      <h2 className="title">Products</h2>
      <div className="manage-product-filter">
        <ProductFilter onChange={handleChangeFilter} filter={filter} />
      </div>
      <Link to="/pages/products/new-product">
        <Button className="btn-add-product">Add Product</Button>
      </Link>
      <Table
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
              <Button
                onClick={() => {
                  setOpenDeleteModal(true);
                }}
                disabled={false}
                color="yellow"
                className="btn-save-change"
              >
                Remove selected
              </Button>
              <Dialog
                open={openDeleteModal}
                onClose={() => {
                  setOpenDeleteModal(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{'Confirm Update?'}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you want to remove these products ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpenDeleteModal(false);
                    }}
                  >
                    No
                  </Button>
                  <Button onClick={handleDeleteUser}>Yes</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <>
              {listProductsChange.length > 0 ? (
                <>
                  <Button
                    onClick={() => {
                      setOpenSaveModal(true);
                    }}
                    disabled={false}
                    color="yellow"
                    className="btn-save-change"
                  >
                    Save changes
                  </Button>
                  <Dialog
                    open={openSaveModal}
                    onClose={() => {
                      setOpenSaveModal(false);
                    }}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">{'Confirm Update?'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Do you want to update this product?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button
                        onClick={() => {
                          setOpenSaveModal(false);
                        }}
                      >
                        No
                      </Button>
                      <Button onClick={handleSaveChange}>Yes</Button>
                    </DialogActions>
                  </Dialog>
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

export default ManageProducts;
