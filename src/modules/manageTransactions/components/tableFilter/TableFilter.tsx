import React, { useState } from 'react';
import './table-filter.scss';
import InputForm from '../inputFrom/InputForm';
import SelectForm from '../selectForm/SelectForm';
import InputDateForm from '../inputDateForm/InputDateForm';
import axios from 'axios';
import { iFilter, Transactions } from 'models/transactions';
import { formatDate } from 'modules/manageTransactions/utils';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  changeFilter: Function;
}
const statusop = [
  {
    value: 'Spending',
    name: 'Spending',
  },
  {
    value: 'Fulfilled',
    name: 'Fulfilled',
  },
  {
    value: 'Received',
    name: 'Received',
  },
  {
    value: 'Processing',
    name: 'Processing',
  },
];

const TableFilter = (props: Props) => {
  const { changeFilter } = props;
  const [errorDate, setErrorDate] = useState(false);
  const initFilter = {
    status: '',
    from: '',
    to: '',
    invoice: '',
  };
  const [filter, setFilter] = useState<iFilter>(initFilter);
  const handleChangeState = (a: {}) => {
    console.log('change filter from TableFilter');
    setFilter({
      ...filter,
      ...a,
    });
  };
  const handleShowError = () => {
    setErrorDate(true);
  };
  const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorDate(false);
  };
  return (
    <div className="table-filter">
      <div className="table-filter-list">
        <div className="table-filter-form">
          <SelectForm changeState={handleChangeState} value={filter?.status} name="status" options={statusop} />
        </div>
        <div className="table-filter-form">
          <InputDateForm
            changeState={handleChangeState}
            value={filter?.from ? filter.from : ''}
            label="From"
            name="from"
          />
        </div>

        <div className="table-filter-form">
          <InputDateForm changeState={handleChangeState} value={filter?.to ? filter.to : ''} label="To" name="to" />
        </div>
        <div className="table-filter-form">
          <InputForm name="invoice" label="Invoice" value={filter.invoice} changeState={handleChangeState} />
        </div>
      </div>
      <div className="table-filter-btns">
        <button
          onClick={() => {
            // formatDate(filter.from) <= formatDate(filter.to)
            if (moment(filter.to).isAfter(filter.from) || filter.to == filter.from) {
              changeFilter(filter);
            } else {
              console.log('false');
              handleShowError();
            }
          }}
          className="table-filter-btns-apply"
        >
          Apply
        </button>

        <button
          onClick={() => {
            changeFilter(initFilter);
            setFilter(initFilter);
          }}
          className="table-filter-btns-clear"
        >
          Clear
        </button>
      </div>
      <Snackbar open={errorDate} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          Vui lòng chọn ngày tháng phù hợp
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TableFilter;
