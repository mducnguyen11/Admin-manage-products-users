import './manage-users.scss';
import { API_PATHS } from 'configs/api';
import { defaultFilterUserValue, IFilterUser, IUserDataTableItem } from 'models/admin/user';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import ProductFilter from './components/UserFilter/Filter';
import ProductTable from './components/Table/Table';
import TablePagination from '@mui/material/TablePagination';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { setLoading, stopLoading } from 'modules/admin/redux/loadingReducer';
import Button from 'modules/admin/components/Button/Button';

interface Props {}

const ManageUsers = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listUsers, setListUsers] = useState<{ select_checked: boolean; user: IUserDataTableItem }[]>([]);
  const [filter, setFilter] = useState<IFilterUser>(defaultFilterUserValue);
  const [alertSuccess, setAlertSuccess] = React.useState('');
  const [alertError, setAlertError] = React.useState<string>('');
  const [totalItem, setTotalItem] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseAlertSuccess = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertSuccess('');
  };
  const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertError('');
  };
  const handleChangePage = useCallback((event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setFilter({
      ...filter,
      page: newPage + 1,
    });
  }, []);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFilter({
      ...filter,
      count: parseInt(event.target.value, 10),
    });
  };
  const getUsers = React.useCallback(async () => {
    dispatch(setLoading());
    const res = await dispatch(fetchThunk(API_PATHS.getUserList, 'post', { ...filter }));
    if (res.data.length > 0 && res.success) {
      const ll = res.data.map((a: IUserDataTableItem, i: number) => {
        return {
          select_checked: false,
          user: a,
        };
      });
      setListUsers(ll);
      setTotalItem(Number(res.recordsFiltered));
    } else {
      setAlertError('Have no product');
      setListUsers([]);
      setTotalItem(0);
    }
    dispatch(stopLoading());
  }, [setListUsers, filter]);
  useEffect(() => {
    getUsers();
  }, [filter]);
  const handleChangeRow = (xx: { select_checked: boolean; user: IUserDataTableItem }) => {
    const iz = listUsers.findIndex((a) => a.user.profile_id == xx.user.profile_id);
    const ll = [...listUsers];
    ll[iz] = {
      ...xx,
    };
    setListUsers(ll);
  };
  const handleRemoveSelected = async () => {
    setOpenDeleteModal(false);
    dispatch(setLoading());
    const dd = listUsers.filter((a) => a.select_checked == true);
    const params = [
      ...dd.map((a) => {
        return {
          id: a.user.profile_id,
          delete: 1,
        };
      }),
    ];

    const res = await dispatch(fetchThunk(API_PATHS.deleteUserByIDArray, 'post', { params: params }));
    if (res.success) {
      getUsers();
      setAlertSuccess('Removre successully');
    } else {
      setAlertError('Remove fail');
    }
    dispatch(stopLoading());
  };
  const handleSelectAll = (g: boolean) => {
    const xx = listUsers.map((a) => {
      return {
        ...a,
        select_checked: g,
      };
    });
    setListUsers([...xx]);
  };
  const handleChangeFilter = useCallback(
    (a: Object) => {
      setFilter({
        ...filter,
        ...a,
      });
    },
    [setFilter],
  );
  return (
    <div className="manage-users">
      <h2 className="title">Search for User</h2>
      <div className="manage-users-filter">
        <ProductFilter onChange={handleChangeFilter} filter={filter} />
      </div>
      <Link to="/pages/user/new-user">
        <Button className="btn-add-product">Add User</Button>
      </Link>
      <ProductTable
        handleSelectAll={handleSelectAll}
        handleChangeSort={handleChangeFilter}
        sort={filter.sort}
        order_by={filter.order_by}
        handleUpdateEnable={() => {}}
        handleChangeData={handleChangeRow}
        data={listUsers}
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
      <div className="bottom-btns">
        <Button
          onClick={() => {
            setOpenDeleteModal(true);
          }}
          color="yellow"
          className="btn-export"
        >
          Remove Selected
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
            <DialogContentText id="alert-dialog-description">Do you want to remove these users ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDeleteModal(false);
              }}
            >
              No
            </Button>
            <Button onClick={handleRemoveSelected}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <Snackbar open={alertSuccess !== ''} autoHideDuration={3000} onClose={handleCloseAlertSuccess}>
        <Alert onClose={handleCloseAlertSuccess} severity="success" sx={{ width: '100%' }}>
          {alertSuccess}
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

export default ManageUsers;
