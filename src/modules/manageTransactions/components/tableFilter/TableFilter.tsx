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
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { setFilter } from 'modules/manageTransactions/redux/transactions';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {}
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
  const filter = useSelector((state: AppState) => state.transactions.filter);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const handleChangeState = (a: iFilter) => {
    console.log('change filter from TableFilter');
    dispatch(setFilter(a));
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
          <InputDateForm changeState={handleChangeState} value={filter.to} label="To" name="to" />
        </div>
        <div className="table-filter-form">
          <InputForm name="invoice" label="Invoice" value={filter.invoice} changeState={handleChangeState} />
        </div>
      </div>
      <div className="table-filter-btns">
        <button
          onClick={() => {
            // formatDate(filter.from) <= formatDate(filter.to)
            // if (moment(filter.to).isAfter(filter.from) || filter.to == filter.from) {
            // changeFilter(filter);
            // } else {
            //   console.log('false');
            //   handleShowError();
            // }
            alert('You dont have to clcik this button');
          }}
          className="table-filter-btns-apply"
        >
          Apply
        </button>

        <button
          onClick={() => {
            handleChangeState({
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
