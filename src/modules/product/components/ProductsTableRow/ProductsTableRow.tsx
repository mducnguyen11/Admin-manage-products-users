import './ProductsTableRow.scss';
import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProductTableItem } from 'models/product';
import InputTableRow from '../InputTableRow/InputTableRow';
import { formatTimeStampToDateString } from 'utils/formatTime';
import ModalButton from 'modules/common/components/ModalButton/ModalButton';

interface Props {
  item: {
    select_checked: boolean;
    product: IProductTableItem;
    delete_checked: boolean;
  };
  handleUpdateEnable: (id: string, enable: number) => void;
  handleChangeProduct: (product: {
    select_checked: boolean;
    delete_checked: boolean;
    product: IProductTableItem;
  }) => void;
}

const ProductsTableRow = (props: Props) => {
  const [isEditing, setEditing] = useState('');
  const item = props.item;
  const handleEnableAction = () => {
    if (item.product.enabled == '1') {
      props.handleUpdateEnable(item.product.id, 0);
    } else {
      props.handleUpdateEnable(item.product.id, 1);
    }
  };
  return (
    <tr className={props.item.delete_checked ? 'table-row table-row-disabled' : 'table-row'}>
      <td scope="row">
        <div className="table-row-item">
          <div className="table-row-actions table-row-item-value">
            <input
              onChange={() => {
                props.handleChangeProduct({
                  ...item,
                  select_checked: !item.select_checked,
                });
              }}
              checked={item.select_checked}
              className="table-row-check"
              type="checkbox"
            />
            <ModalButton
              name={
                <i
                  className={
                    Number(item.product.enabled) == 0
                      ? 'table-row-power bx bx-power-off '
                      : 'table-row-power bx bx-power-off power-disabled'
                  }
                ></i>
              }
              modalTitle="Warning"
              onClick={() => {
                handleEnableAction();
              }}
              modalContent="Confirm your update ?"
            />
          </div>
        </div>
      </td>
      <td>
        {' '}
        <div className="table-row-item">
          <p className="table-row-sku table-row-item-value">{item.product.sku}</p>
        </div>{' '}
      </td>
      <td>
        <div className="table-row-item">
          <Link className="table-row-item-value" to={'/pages/products/product-detail/' + item.product.id}>
            {item.product.name}
          </Link>
        </div>
      </td>
      <td>
        <div className="table-row-item">
          <p className="table-row-category table-row-item-value">{item.product.category}</p>
        </div>
      </td>
      {!isEditing ? (
        <>
          <td>
            <div onClick={() => setEditing('price')} className="table-row-item">
              <p className="table-row-price-value table-row-item-value">{Number(item.product.price).toFixed(2)}</p>
            </div>
          </td>
          <td>
            {' '}
            <div onClick={() => setEditing('amount')} className="table-row-item">
              <p className="table-row-instock-value table-row-item-value">{item.product.amount}</p>
            </div>
          </td>
        </>
      ) : (
        <>
          <td>
            <div className="table-row-item-edit">
              <InputTableRow
                focus={isEditing}
                unit="USD"
                onCloseInput={() => {
                  setEditing('');
                }}
                name="price"
                onChange={(a: { [key: string]: string }) => {
                  console.log('props item :', props.item);
                  console.log('field change :', {
                    ...item,
                    product: { ...item.product, ...a },
                  });
                  props.handleChangeProduct({
                    ...item,
                    product: { ...item.product, ...a },
                  });
                }}
                className="table-row-price-edit"
                value={Number(item.product.price).toFixed(2)}
              />
            </div>
          </td>
          <td>
            {' '}
            <div className="table-row-item-edit">
              <InputTableRow
                focus={isEditing}
                onCloseInput={() => {
                  setEditing('');
                }}
                name="amount"
                onChange={(a: { [key: string]: string }) => {
                  props.handleChangeProduct({
                    ...item,
                    product: { ...item.product, ...a },
                  });
                }}
                className="table-row-instock-edit"
                value={item.product.amount}
              />
            </div>
          </td>
        </>
      )}
      <td>
        <div className="table-row-item">
          <Link
            className="table-row-vendor table-row-item-value"
            to={'/pages/user/user-detail/' + item.product.vendorID}
          >
            {item.product.vendor}
          </Link>
        </div>
      </td>
      <td>
        <div className="table-row-item">
          <p className="table-row-arrivaldate table-row-item-value">
            {formatTimeStampToDateString(item.product.arrivalDate)}
          </p>
        </div>
      </td>
      <td>
        <div className="table-row-item">
          <div className="table-row-delete-action">
            <div
              onClick={() => {
                props.handleChangeProduct({
                  ...props.item,
                  delete_checked: !props.item.delete_checked,
                });
              }}
              className="table-row-delete-action-icon"
            >
              <i className="table-row-delete-icon bx bxs-trash"></i>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default memo(ProductsTableRow);
