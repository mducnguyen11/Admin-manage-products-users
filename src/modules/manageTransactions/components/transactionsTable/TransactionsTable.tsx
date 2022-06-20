import React, { useCallback } from 'react';
import './transactions-table.scss';
import TableHeader from '../tableHeader/TableHeader';
import TableFilter from '../tableFilter/TableFilter';
import TableContent from '../tableContent/TableContent';
import { useState, useEffect } from 'react';
import { iFilter, Transactions } from 'models/transactions';
import axios from 'axios';
import { API_PATHS } from 'configs/api';
import moment from 'moment';
import { formatStatus, formatDate } from 'modules/manageTransactions/utils';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TablePagination from '../tablePagination/TablePagination';
interface Props {}

const TransactionsTable = (props: Props) => {
  const [data, setdata] = useState<Transactions[]>([]);
  const [dataPresent, setDataPresent] = useState<Transactions[]>([]);
  const [dataRender, setDataRender] = useState<Transactions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getData = useCallback(async () => {
    const res = await axios.get(API_PATHS.transactionsData);
    console.log(res.data);
    setdata(res.data);
    setDataPresent(res.data);
    setDataRender(res.data.slice(0, page * 5));
  }, [setdata, setDataPresent]);
  useEffect(() => {
    getData();
  }, []);
  const handleFilter = (a: iFilter) => {
    console.log('aplly from table', a);
    let xx = [...data];
    if (a.status == '' && a.from == '' && a.invoice == '' && a.to == '') {
      setDataPresent(data);
      setDataRender(data.slice(0, 5));
      return setPage(1);
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
    if (a.from && a.to) {
      xx = xx.filter((ax) => {
        if (
          moment(formatDate(ax.date_confirmed)).isAfter(a.from) &&
          !moment(formatDate(ax.date_confirmed)).isAfter(a.to)
        ) {
          return ax;
        }
      });
    }
    setDataPresent(xx);
    setDataRender(xx.slice(0, 5));
    setPage(1);
  };
  const handleDeleteTransaction = async (id: string) => {
    setIsLoading(true);
    await axios.delete(API_PATHS.transactionsData + '/' + id);
    getData();
    setIsLoading(false);
  };
  const changePage = (newpage: number) => {
    console.log(newpage);
    const newarr = dataPresent.slice((newpage - 1) * 5, newpage * 5);
    console.log('new arrray');
    console.log(newarr);
    setDataRender(newarr);
    setPage(newpage);
  };

  console.log('render');
  return (
    <div className="transactions-table">
      <div className="transactions-table-header">
        <TableHeader />
      </div>
      <div className="transactions-table-filter">
        <TableFilter changeFilter={handleFilter} />
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
        <TablePagination changePage={changePage} count={5} total={dataPresent.length} page={page} />
      </div>
    </div>
  );
};

export default TransactionsTable;
