import React, { memo, useCallback } from 'react';
import './transactions-table.scss';
import TableHeader from '../tableHeader/TableHeader';
import { dinero, lessThan } from 'dinero.js';
import * as xx from '@dinero.js/currencies';
import TableFilter from '../tableFilter/TableFilter';
import TableContent from '../tableContent/TableContent';
import { useState, useEffect } from 'react';
import { iFilter, Transaction } from 'models/transactions';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import moment from 'moment';
import {
  formatStatus,
  formatDate,
  setDatatoRender,
  filterTransactions,
  sortTransactions,
} from 'modules/manageTransactions/utils';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TablePagination from '../tablePagination/TablePagination';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

import { setPayrollsList, setPage } from 'modules/manageTransactions/redux/transactions';
import { array } from 'yup';
interface Props {}

const TransactionsTable = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [dataCurrent, setDataCurrent] = useState<Transaction[]>([]); // data afterfilter
  const [dataRender, setDataRender] = useState<Transaction[]>([]); // data of a per page
  const [isLoading, setIsLoading] = useState(false);

  const page = useSelector((state: AppState) => state.transactions.page);
  const data = useSelector((state: AppState) => state.transactions.payrollsList);
  const sort = useSelector((state: AppState) => state.transactions.sort);
  const filter = useSelector((state: AppState) => state.transactions.filter);
  const getData = useCallback(async () => {
    setIsLoading(true);
    console.log('Statrt call api get data ....');
    const res = await axios.get(API_PATHS.transactionsData);
    dispatch(setPayrollsList(res.data));
    setDataCurrent(res.data);
    console.log('Set data to render');
    let newarr: Transaction[] = [...res.data];
    console.log('page :', page, ' datacurrent length :', res.data.length);
    if (page * 5 >= res.data.length + 5) {
      dispatch(setPage(page - 1));
    } else {
      if (page == 0) {
        console.log('page : 0 so dispatch 1');
        dispatch(setPage(1));
      } else {
        if (filter) {
          newarr = filterTransactions(newarr, filter);
        }
        if (sort) {
          newarr = sortTransactions(newarr, sort);
        }
        setDataCurrent(newarr);
        newarr = setDatatoRender(newarr, page);
      }
    }

    setDataRender(newarr);
    setIsLoading(false);
  }, [page, sort, filter]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('loadddd wwwww');
    let xx = filterTransactions([...data], filter);
    xx = sortTransactions(xx, sort);
    setDataCurrent(xx);
    xx = setDatatoRender(xx, page);
    setDataRender(xx);
  }, [filter, sort, page]);

  const handleDeleteTransaction = async (id: string, total: string) => {
    console.log('delete row - total :', total);
    console.log(sort);
    setIsLoading(true);
    await axios.delete(API_PATHS.transactionsData + '/' + id);
    getData();
  };

  return (
    <div className="transactions-table">
      <div className="transactions-table-header">
        <TableHeader />
      </div>
      <div className="transactions-table-filter">
        <TableFilter />
      </div>
      {isLoading ? (
        <Box sx={{ display: 'flex', position: 'fixed', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}>
          <CircularProgress />
        </Box>
      ) : null}
      <div className="transactions-table-content">
        <TableContent handleDelete={handleDeleteTransaction} data={dataRender} />
      </div>
      <div className="transactions-table-pagination">
        <TablePagination count={5} total={dataCurrent.length} page={page} />
      </div>
    </div>
  );
};

export default memo(TransactionsTable);
