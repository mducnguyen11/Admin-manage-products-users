import './table-row.scss';
import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IProductTableItem } from 'models/admin/product';
import InputTableRow from '../InputTableRow/InputTableRow';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { formatTimeStampToDate } from 'modules/admin/ultis';

interface Props {
  item: {
    select_checked: boolean;
    product: IProductTableItem;
    delete_checked: boolean;
  };
  handleChangeProduct: Function;
  handleUpdateEnable: Function;
}

const TableRow = (props: Props) => {
  const [isEditing, setEditing] = useState('');
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const item = props.item;
  const handlePowerAction = () => {
    if (item.product.enabled == '1') {
      props.handleUpdateEnable({
        ...item,
        product: {
          ...item.product,
          enabled: 0,
        },
      });
    } else {
      props.handleUpdateEnable({
        ...item,
        product: {
          ...item.product,
          enabled: 1,
        },
      });
    }
    setOpen(false);
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
            <i
              onClick={handleClickOpen}
              className={
                Number(item.product.enabled) == 0
                  ? 'table-row-power bx bx-power-off '
                  : 'table-row-power bx bx-power-off power-disabled'
              }
            ></i>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{'Warning?'}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">Make sure that you want to do this</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handlePowerAction} autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
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
                value={item.product.price}
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
            {formatTimeStampToDate(item.product.arrivalDate)}
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

export default memo(TableRow);
