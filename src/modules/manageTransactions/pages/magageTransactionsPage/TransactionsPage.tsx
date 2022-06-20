import React from 'react';
import TransactionsTable from 'modules/manageTransactions/components/transactionsTable/TransactionsTable';
import './transactions-page.scss';

interface Props {}

const TransactionsPage = (props: Props) => {
  return (
    <div className="manage-user-page">
      <div className="manage-user-page-container">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default TransactionsPage;
