import './ProductTable.scss';
import { IUserDataTableItem } from 'models/admin/user';
import React, { memo } from 'react';
import TableRow from '../TableRow/TableRow';
interface Props {
  data: { select_checked: boolean; user: IUserDataTableItem }[];
  handleChangeData: Function;
  handleChangeSort: Function;
  sort: string;
  order_by: string;
  handleSelectAll: Function;
}
const listField: {
  sort: boolean;
  sort_by: string;
  title: string;
}[] = [
  {
    sort: true,
    sort_by: 'vendor',
    title: 'Login/Email',
  },
  {
    sort: true,
    sort_by: 'fistName',
    title: 'Name',
  },
  {
    sort: true,
    sort_by: 'access_level',
    title: 'Access level ',
  },
  {
    sort: false,
    sort_by: '',
    title: 'Products',
  },
  {
    sort: false,
    sort_by: '',
    title: 'Orders',
  },
  {
    sort: false,
    sort_by: '',
    title: 'Wishlist',
  },
  {
    sort: true,
    sort_by: 'created',
    title: 'Created',
  },
  {
    sort: true,
    sort_by: 'last_login',
    title: 'Last login',
  },
];
const UsersTable = (props: Props) => {
  return (
    <div className="table-wrapper">
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
                      xx.sort = a.sort_by;
                      console.log('props oeerrđy ,', props.order_by == 'ASC');
                      if (props.order_by == 'ASC') {
                        xx.order_by = 'DESC';
                      } else {
                        xx.order_by = 'ASC';
                      }
                      props.handleChangeSort(xx);
                    }
                  }}
                  key={i}
                  scope={'col ' + a.sort_by + ' '}
                >
                  <div className="table-col">
                    <p className={a.sort + '-sort'}>
                      {a.title}{' '}
                      {a.sort ? (
                        <>
                          {' '}
                          {props.sort == a.sort_by ? (
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
          </tr>
        </thead>
        <tbody>
          {props.data.map((a, i) => {
            return <TableRow onChange={props.handleChangeData} key={i} item={a} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default memo(UsersTable);
