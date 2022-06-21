import React, { useState } from 'react';
import './table-filter.scss';
import InputForm from '../inputFrom/InputForm';
import SelectForm from '../selectForm/SelectForm';
import InputDateForm from '../inputDateForm/InputDateForm';
import axios from 'axios';
import { iFilter, Transaction } from 'models/transactions';
import { formatDate } from 'modules/manageTransactions/utils';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  changeFilter: Function;
  filter: iFilter;
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

  const handleChangeState = (a: {}) => {
    console.log('change filter from TableFilter');
    changeFilter({
      ...props.filter,
      ...a,
    });
  };

  return (
    <div className="table-filter">
      <div className="table-filter-list">
        <div className="table-filter-form">
          <SelectForm changeState={handleChangeState} value={props.filter?.status} name="status" options={statusop} />
        </div>
        <div className="table-filter-form">
          <InputDateForm
            changeState={handleChangeState}
            value={props.filter?.from ? props.filter.from : ''}
            label="From"
            name="from"
          />
        </div>

        <div className="table-filter-form">
          <InputDateForm
            changeState={handleChangeState}
            value={props.filter?.to ? props.filter.to : ''}
            label="To"
            name="to"
          />
        </div>
        <div className="table-filter-form">
          <InputForm name="invoice" label="Invoice" value={props.filter.invoice} changeState={handleChangeState} />
        </div>
      </div>
      <div className="table-filter-btns">
        <button
          onClick={() => {
            // formatDate(filter.from) <= formatDate(filter.to)
            // if (moment(filter.to).isAfter(filter.from) || filter.to == filter.from) {
            changeFilter(props.filter);
            // } else {
            //   console.log('false');
            //   handleShowError();
            // }
          }}
          className="table-filter-btns-apply"
        >
          Apply
        </button>

        <button
          onClick={() => {
            changeFilter({
              status: '',
              from: '',
              to: '',
              invoice: '',
            });
          }}
          className="table-filter-btns-clear"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default TableFilter;
