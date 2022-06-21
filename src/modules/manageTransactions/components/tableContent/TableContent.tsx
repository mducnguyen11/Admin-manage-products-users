import React, { useEffect, useState } from 'react';
import './table-content.scss';
import { Transaction } from 'models/transactions';
import RowTable from '../rowTable/RowTable';
import { formatDate } from 'modules/manageTransactions/utils';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { setSort } from 'modules/manageTransactions/redux/transactions';
interface Props {
  data: Transaction[];
  handleDelete: Function;
}

const TableContent = (props: Props) => {
  const sort = useSelector((state: AppState) => state.transactions.sort);
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  return (
    <div className="table-content">
      <div className="table-content-header">
        <div className="w-14">
          <h6>Status</h6>
        </div>
        <div className="w-14 table-content-header-sort-item">
          <h6>Date</h6>
          {sort?.date == 'decrease' ? (
            <i
              onClick={() => {
                dispatch(setSort({ date: 'increase' }));
              }}
              className="bx bxs-chevrons-up"
            ></i>
          ) : (
            <i
              onClick={() => {
                dispatch(
                  setSort({
                    date: 'decrease',
                  }),
                );
              }}
              className="bx bxs-chevrons-down"
            ></i>
          )}
        </div>
        <div className="w-14">
          <h6>Curentcy</h6>
        </div>
        <div className="w-14 table-content-header-sort-item">
          <h6>Total</h6>
          {sort?.total == 'decrease' ? (
            <i
              onClick={() => {
                dispatch(setSort({ total: 'increase' }));
              }}
              className="bx bxs-chevrons-up"
            ></i>
          ) : (
            <i
              onClick={() => {
                dispatch(
                  setSort({
                    total: 'decrease',
                  }),
                );
              }}
              className="bx bxs-chevrons-down"
            ></i>
          )}
        </div>
        <div className="w-14">
          <h6>Invoice #</h6>
        </div>
        <div className="w-14 btn-clear-sort">
          <h6
            onClick={() => {
              dispatch(
                setSort({
                  date: 'no sort',
                  total: 'no sort',
                }),
              );
            }}
          >
            Clear sort
          </h6>
        </div>
        <div className="w-rest"></div>
      </div>
      <div className="table-content-data">
        {props.data?.map((a, i) => {
          return <RowTable handleDelete={props.handleDelete} item={a} key={i} />;
        })}
      </div>
    </div>
  );
};

export default TableContent;
