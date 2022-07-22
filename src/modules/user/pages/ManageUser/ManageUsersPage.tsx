import './ManageUsersPage.scss';
import { API_PATHS } from 'configs/api';
import { defaultFilterUserValue, IFilterUser, IFilterUserField, IUserDataTableItem } from 'models/user';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import TablePagination from '@mui/material/TablePagination';
import { Alert, AlertColor, Snackbar } from '@mui/material';

import Button from 'modules/common/components/Button/Button';
import { setLoading, stopLoading } from 'modules/common/redux/loadingReducer';
import UsersFilter from 'modules/user/components/UsersFilter/UsersFilter';
import UsersTable from 'modules/user/components/UsersTable/UsersTable';
import ModalButton from 'modules/common/components/ModalButton/ModalButton';

const ManageUsers = () => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [listUsers, setListUsers] = useState<{ select_checked: boolean; user: IUserDataTableItem }[]>([]);
  const [filter, setFilter] = useState<IFilterUser>(defaultFilterUserValue);

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
  const handleChangePage = useCallback(
    (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setFilter({
        ...filter,
        page: newPage + 1,
      });
    },
    [filter, setFilter],
  );
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
      const listUsers = res.data.map((item: IUserDataTableItem) => {
        return {
          select_checked: false,
          user: { ...item },
        };
      });
      setListUsers(listUsers);
      setTotalItem(Number(res.recordsFiltered));
    } else {
      handleShowAlertError('Have no product');
      setListUsers([]);
      setTotalItem(0);
    }
    dispatch(stopLoading());
  }, [filter]);
  useEffect(() => {
    getUsers();
    window.scrollTo(0, 0);
  }, [filter]);
  const handleChangeUserDataRow = useCallback(
    (newUser: { select_checked: boolean; user: IUserDataTableItem }) => {
      const index = listUsers.findIndex((item) => item.user.profile_id == newUser.user.profile_id);
      const newListUser = [...listUsers];
      newListUser[index] = {
        ...newUser,
      };
      setListUsers(newListUser);
    },
    [listUsers],
  );

  const handleRemoveSelected = async () => {
    dispatch(setLoading());
    const selectedList = listUsers.filter((a) => a.select_checked == true);
    const params = [
      ...selectedList.map((item) => {
        return {
          id: item.user.profile_id,
          delete: 1,
        };
      }),
    ];
    const res = await dispatch(fetchThunk(API_PATHS.deleteUserByIDArray, 'post', { params: params }));
    if (res.success) {
      getUsers();
      handleShowAlertSuccess('Removre successully');
    } else {
      handleShowAlertError('Remove fail');
    }
    dispatch(stopLoading());
  };
  const handleSelectAll = useCallback(
    (value: boolean) => {
      const newListUsers = listUsers.map((a) => {
        return {
          ...a,
          select_checked: value,
        };
      });
      setListUsers([...newListUsers]);
    },
    [listUsers],
  );
  const handleChangeFilter = useCallback(
    (filterField: IFilterUserField) => {
      setFilter({
        ...filter,
        ...filterField,
      });
    },
    [filter],
  );
  const disabledBtn = useMemo(() => {
    if (listUsers.findIndex((a) => a.select_checked) > -1) {
      return false;
    }
    return true;
  }, [listUsers]);
  return (
    <div className="manage-users">
      <h2 className="title">Search for User</h2>
      <div className="manage-users-filter">
        <UsersFilter onChange={handleChangeFilter} filter={filter} />
      </div>
      <Link to="/pages/user/new-user">
        <Button className="btn-add-product">Add User</Button>
      </Link>
      <UsersTable
        handleSelectAll={handleSelectAll}
        handleChangeSort={handleChangeFilter}
        sort={filter.sort}
        order_by={filter.order_by}
        handleChangeData={handleChangeUserDataRow}
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
        <ModalButton
          disabled={disabledBtn}
          color="yellow"
          onClick={handleRemoveSelected}
          name="Remove selected"
          modalTitle="Warning"
          modalContent="Make sure u want to  delete these users"
        />
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

export default ManageUsers;
