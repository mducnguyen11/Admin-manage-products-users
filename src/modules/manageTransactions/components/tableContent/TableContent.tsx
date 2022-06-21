import React from 'react';
import './table-content.scss';
import { Transaction } from 'models/transactions';
import RowTable from '../rowTable/RowTable';
interface Props {
  data?: Transaction[];
  handleDelete: Function;
}

const TableContent = (props: Props) => {
  return (
    <div className="table-content">
      <div className="table-content-header">
        <div className="w-14">
          <h6>Status</h6>
        </div>
        <div className="w-14">
          <h6>Data</h6>
        </div>
        <div className="w-14">
          <h6>Curentcy</h6>
        </div>
        <div className="w-14">
          <h6>Total</h6>
        </div>
        <div className="w-14">
          <h6>Invoice #</h6>
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
