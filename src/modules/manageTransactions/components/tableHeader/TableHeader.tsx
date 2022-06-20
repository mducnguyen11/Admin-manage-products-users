import React from 'react';
import './table-header.scss';
interface Props {}

const TableHeader = (props: Props) => {
  return (
    <div className="table-header">
      <h4>Payroll Transactions List</h4>
      <button>Export as CSV</button>
    </div>
  );
};

export default TableHeader;
