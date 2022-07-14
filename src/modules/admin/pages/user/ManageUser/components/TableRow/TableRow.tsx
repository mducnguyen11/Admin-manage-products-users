import './table-row.scss';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { IUserDataTableItem } from 'models/admin/user';
import { formatTimeStampToDate } from 'modules/admin/ultis';

interface Props {
  item: {
    select_checked: boolean;
    user: IUserDataTableItem;
  };
  onChange: Function;
}

const TableRow = (props: Props) => {
  const item = props.item;
  return (
    <tr className="table-row">
      <td scope="row">
        <div className="table-row-item">
          <div className="table-row-actions table-row-item-value">
            <input
              onChange={() => {
                props.onChange({
                  ...item,
                  select_checked: !item.select_checked,
                });
              }}
              checked={item.select_checked}
              className="table-row-check"
              type="checkbox"
            />
          </div>
        </div>
      </td>
      <td>
        {' '}
        <div className="table-row-item">
          <Link className="table-row-item-value" to={'/pages/user/user-detail/' + (item.user.profile_id || '')}>
            {item.user.vendor}
          </Link>
        </div>{' '}
      </td>
      <td>
        <div className="table-row-item">
          <Link
            className="table-row-item-value"
            to={'/pages/user/user-detail/' + item.user.profile_id + '?target=address'}
          >
            {(item.user.lastName || '') + ' ' + (item.user.fistName || '')}
          </Link>
        </div>
      </td>
      <td>
        <div className="table-row-item">
          <p className="table-row-item-value">{item.user.access_level}</p>
        </div>
      </td>

      <td>
        <div className="table-row-item">
          <Link to={'/pages/products/manage-product?vendor=' + item.user.vendor_id} className="table-row-item-value">
            {item.user.product}
          </Link>
        </div>
      </td>
      <td>
        {' '}
        <div className="table-row-item">
          <p className="table-row-item-value">{item.user.order.order_as_buyer}</p>
        </div>
      </td>

      <td>
        <div className="table-row-item">
          <Link
            className="table-row-item-value"
            to={'/pages/user/user-detail/' + (item.user.profile_id || '') + '?target=wishlist'}
          >
            {item.user.wishlist}
          </Link>
        </div>
      </td>
      <td>
        <div className="table-row-item">
          <p className="table-row-item-value">{formatTimeStampToDate(item.user.created)}</p>
        </div>
      </td>

      <td>
        <div className="table-row-item">
          <p className="table-row-item-value">{formatTimeStampToDate(item.user.last_login)}</p>
        </div>
      </td>
    </tr>
  );
};

export default memo(TableRow);
