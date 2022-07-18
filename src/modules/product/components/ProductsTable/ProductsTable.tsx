import './ProductsTable.scss';
import { IFilterProductField, IProductTableItem } from 'models/product';
import React, { memo } from 'react';
import TableRow from '../ProductsTableRow/ProductsTableRow';

interface Props {
  data: { select_checked: boolean; delete_checked: boolean; product: IProductTableItem }[];
  handleUpdateEnable: (id: string, enable: number) => void;
  handleChangeData: (product: { select_checked: boolean; delete_checked: boolean; product: IProductTableItem }) => void;
  handleChangeSort: (value: IFilterProductField) => void;
  sort: string;
  order_by: string;
  handleSelectAll: (value: boolean) => void;
}
const listField: {
  sort: boolean;
  name: string;
  title: string;
}[] = [
  {
    sort: true,
    name: 'sku',
    title: 'SKU',
  },
  {
    sort: true,
    name: 'name',
    title: 'Name',
  },
  {
    sort: false,
    name: 'category',
    title: 'Category',
  },
  {
    sort: true,
    name: 'price',
    title: 'Price',
  },
  {
    sort: true,
    name: 'amount',
    title: 'In stock',
  },
  {
    sort: true,
    name: 'vendor',
    title: 'Vendor',
  },
  {
    sort: true,
    name: 'arrivalDate',
    title: 'Arrival Date',
  },
];
const ProductsTable = (props: Props) => {
  return (
    <div className="table-wrapper">
      <div className="product-table">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th scope="col ">
                {' '}
                <div className="table-col action">
                  <input
                    className="action-checkbox"
                    checked={props.data.findIndex((a) => a.select_checked == false) == -1 && props.data.length > 0}
                    onChange={(e) => {
                      if (props.data.findIndex((a) => a.select_checked == false) > -1) {
                        props.handleSelectAll(true);
                      } else {
                        props.handleSelectAll(false);
                      }
                    }}
                    type="checkbox"
                  />
                </div>
              </th>
              {listField.map((a, i) => {
                return (
                  <th
                    onClick={() => {
                      if (a.sort) {
                        const xx: {
                          sort: string;
                          order_by: string;
                        } = {
                          sort: '',
                          order_by: '',
                        };
                        xx.sort = a.name;

                        if (props.order_by == 'ASC') {
                          xx.order_by = 'DESC';
                        } else {
                          xx.order_by = 'ASC';
                        }
                        props.handleChangeSort(xx);
                      }
                    }}
                    key={i}
                    scope={'col ' + a.name + ' '}
                  >
                    <div className="table-col">
                      <p className={a.sort + '-sort'}>
                        {a.title}{' '}
                        {a.sort ? (
                          <>
                            {' '}
                            {props.sort == a.name ? (
                              <>
                                {props.order_by == 'ASC' ? (
                                  <i className="bx bx-down-arrow-alt"></i>
                                ) : (
                                  <i className="bx bx-up-arrow-alt"></i>
                                )}
                              </>
                            ) : null}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </th>
                );
              })}
              <th scope="col ">
                {' '}
                <div className="table-col action"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((a, i) => {
              return (
                <TableRow
                  handleUpdateEnable={props.handleUpdateEnable}
                  handleChangeProduct={props.handleChangeData}
                  key={i}
                  item={a}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default memo(ProductsTable);
