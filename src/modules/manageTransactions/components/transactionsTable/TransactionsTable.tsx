import React, { memo, useCallback } from 'react';
import './transactions-table.scss';
import TableHeader from '../tableHeader/TableHeader';
import { dinero, lessThan } from 'dinero.js';
import * as curentcyx from '@dinero.js/currencies';
import TableFilter from '../tableFilter/TableFilter';
import TableContent from '../tableContent/TableContent';
import { useState, useEffect } from 'react';
import { iFilter, Transaction } from 'models/transactions';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import moment from 'moment';
import { formatStatus, formatDate } from 'modules/manageTransactions/utils';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TablePagination from '../tablePagination/TablePagination';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

import { setPayrollsList, setPage } from 'modules/manageTransactions/redux/transactions';
interface Props {}

const TransactionsTable = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [dataCurrent, setDataCurrent] = useState<Transaction[]>([]); // data afterfilter
  const [dataRender, setDataRender] = useState<Transaction[]>([]); // data of a per page
  const [isLoading, setIsLoading] = useState(false);
  const [sort, setSort] = useState<{ date?: string; total?: string }>({ date: '', total: '' });
  const [filter, setFilter] = useState<iFilter>({
    status: '',
    from: '',
    to: '',
    invoice: '',
  });
  const page = useSelector((state: AppState) => state.transactions.page);
  const data = useSelector((state: AppState) => state.transactions.payrollsList);
  const getData = useCallback(async () => {
    setIsLoading(true);
    console.log('Statrt call api get data ....');
    const res = await axios.get(API_PATHS.transactionsData);
    dispatch(setPayrollsList(res.data));
    setDataCurrent(res.data);
    console.log('Set data to render');
    let newarr: Transaction[] = [];
    console.log('page :', page, ' datacurrent length :', res.data.length);
    if (page * 5 >= res.data.length + 5) {
      dispatch(setPage(page - 1));
    } else {
      if (page == 0) {
        console.log('page : 0 so dispatch 1');
        dispatch(setPage(1));
      } else {
        if (page * 5 < res.data.length) {
          newarr = res.data.slice((page - 1) * 5, page * 5);
        } else {
          newarr = res.data.slice((page - 1) * 5, res.data.length);
        }
      }
    }
    setDataRender(newarr);
    setIsLoading(false);
  }, [page]);
  console.log('TRansaction Table redner');
  useEffect(() => {
    getData();
  }, []);

  const handleFilter = (a: iFilter) => {
    setFilter(a);
    console.log('aplly from table', a);
    let xx = [...data];
    if (a.status == '' && a.from == '' && a.invoice == '' && a.to == '') {
      setDataCurrent(data);
      setDataRender(data.slice(0, 5));
      return dispatch(setPage(1));
    }
    console.log('hahahacÁI');
    if (a.status) {
      console.log('vc');
      xx = xx.filter((ax) => {
        return formatStatus(ax) == a.status;
      });
    }
    if (a.invoice) {
      console.log('invoice :  ', a.invoice);
      console.log('xx first :', xx[0].payroll_id);
      console.log(xx[0].payroll_id.includes(a.invoice));
      xx = xx.filter((ax) => {
        if (ax.payroll_id.includes(a.invoice.trim())) {
          return ax;
        }
      });
    }
    if (a.from) {
      xx = xx.filter((ax) => {
        if (moment(formatDate(ax.date_confirmed)).isAfter(a.from)) {
          return ax;
        }
      });
    }
    if (a.to) {
      xx = xx.filter((ax) => {
        if (!moment(formatDate(ax.date_confirmed)).isAfter(a.to)) {
          return ax;
        }
      });
    }
    setDataCurrent(xx);
    setDataRender(xx.slice(0, 5));
    dispatch(setPage(1));
  };
  const handleDeleteTransaction = async (id: string, total: string) => {
    console.log('delete row - total :', total);
    setIsLoading(true);
    await axios.delete(API_PATHS.transactionsData + '/' + id);
    getData();
  };

  useEffect(() => {
    console.log('change page :', page, 'total :', dataCurrent.length);
    let newarr = [];
    if (page * 5 <= dataCurrent.length - 1) {
      console.log('vclll 11111111111111111ae', dataCurrent.length, page);
      newarr = dataCurrent.slice((page - 1) * 5, page * 5);
    } else {
      console.log('vclll ae', dataCurrent.length, page);
      newarr = dataCurrent.slice((page - 1) * 5, dataCurrent.length);
    }

    setDataRender(newarr);
  }, [dataCurrent, page]);

  const handleSort = (objsort: { date?: string; total?: string }) => {
    console.log('sort with :', objsort);
    if (objsort.date == sort.date && objsort.total == sort.total) {
      return;
    }
    if (objsort.date) {
      switch (objsort.date) {
        case 'increase':
          console.log('mathch date ins ');
          setDataCurrent(
            [...dataCurrent].sort((a, b) => {
              if (
                lessThan(
                  dinero({
                    amount: a.volume_input_in_input_currency,
                    currency: curentcyx[a.currency as keyof typeof curentcyx],
                  }),
                  dinero({
                    amount: b.volume_input_in_input_currency,
                    currency: curentcyx[b.currency as keyof typeof curentcyx],
                  }),
                )
              ) {
                return 1;
              } else {
                return -1;
              }
            }),
          );
          break;
        case 'decrease':
          console.log('mathch date des ');
          setDataCurrent(
            [...dataCurrent].sort((a, b) => {
              if (
                lessThan(
                  dinero({
                    amount: a.volume_input_in_input_currency,
                    currency: curentcyx[a.currency as keyof typeof curentcyx],
                  }),
                  dinero({
                    amount: b.volume_input_in_input_currency,
                    currency: curentcyx[b.currency as keyof typeof curentcyx],
                  }),
                )
              ) {
                return -1;
              } else {
                return 1;
              }
            }),
          );
          break;
        default:
          handleFilter(filter);
          break;
      }
    }
    if (objsort.total) {
      console.log('mathch total ');
      switch (objsort.total) {
        case 'increase':
          setDataCurrent([
            ...[...dataCurrent].sort((a, b) => {
              if (a.volume_input_in_input_currency > b.volume_input_in_input_currency) {
                return 1;
              } else {
                return -1;
              }
            }),
          ]);
          break;
        case 'decrease':
          setDataCurrent([
            ...[...dataCurrent].sort((a, b) => {
              if (a.volume_input_in_input_currency > b.volume_input_in_input_currency) {
                return -1;
              } else {
                return 1;
              }
            }),
          ]);
          break;
        default:
          handleFilter(filter);
          break;
      }
    }
    setSort(objsort);
  };
  return (
    <div className="transactions-table">
      <div className="transactions-table-header">
        <TableHeader />
      </div>
      <div className="transactions-table-filter">
        <TableFilter filter={filter} changeFilter={handleFilter} />
      </div>
      {isLoading ? (
        <Box sx={{ display: 'flex', position: 'fixed', top: '50%', right: '50%', transform: 'translate(50%,-50%)' }}>
          <CircularProgress />
        </Box>
      ) : null}
      <div className="transactions-table-content">
        <TableContent sort={sort} changeSort={handleSort} handleDelete={handleDeleteTransaction} data={dataRender} />
      </div>
      <div className="transactions-table-pagination">
        <TablePagination count={5} total={dataCurrent.length} page={page} />
      </div>
    </div>
  );
};

export default memo(TransactionsTable);
