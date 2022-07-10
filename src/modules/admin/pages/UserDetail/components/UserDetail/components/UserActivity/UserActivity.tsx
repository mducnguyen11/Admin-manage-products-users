import { formatTimeStampToDate } from 'modules/admin/ultis';
import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  order_as_buyer: number;
  income: string;
  expense: string;
  earning: number | string;
  products_total: string;
  joined: string;
  last_login: string;
  language: string;
  referer: string;
}

const UserActivity = (props: Props) => {
  return (
    <div className="user-detail-section">
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Orders placed as a buyer</p>
        <p className="user-detail-row-value">
          <Link to="/pages">{props.order_as_buyer}</Link>
          {`($0.00)`}
        </p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Vendor Income</p>
        <p className="user-detail-row-value">{props.income}</p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Vendor Expense</p>
        <p className="user-detail-row-value">{props.expense}</p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">
          {' '}
          <Link to={'/haha'}> View transaction details </Link>{' '}
        </p>
        <p className="user-detail-row-value"></p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Earning balance</p>
        <p className="user-detail-row-value">{props.earning}</p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Products listed as vendor</p>
        <p className="user-detail-row-value">
          <Link to={'/home'}> {props.products_total} </Link>
        </p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Joined</p>
        <p className="user-detail-row-value">{formatTimeStampToDate(props.joined)}</p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Last login</p>
        <p className="user-detail-row-value">{formatTimeStampToDate(props.last_login)}</p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Language</p>
        <p className="user-detail-row-value">{props.language}</p>
      </div>
      <div className="user-detail-row-item">
        <p className="user-detail-row-name">Referer</p>
        <p className="user-detail-row-value">{props.referer}</p>
      </div>
    </div>
  );
};

export default UserActivity;
