import { setPage } from 'modules/manageTransactions/redux/transactions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import './table-pagination.scss';
interface Props {
  total: number;
  page: number;
  count: number;
  changePage?: Function;
}

const TablePagination = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const x = Math.ceil(Number(props.total / props.count));
  // console.log('have ', x, 'page, total : ', props.total, 'count :', props.count);
  let xx: any[] = [];
  const setPagination = () => {
    for (let i = 0; i < x; i++) {
      xx.push(Number(i + 1));
    }
    const ix = xx.filter((a) => a == props.page);
    if (xx.length > 10 && ix.length > 0) {
      const crt = ix[0];
      // const a = xx.findIndex(crt);

      if (xx.findIndex((a) => a == crt) < 4 || xx.findIndex((a) => a == crt) > xx.length - 5) {
        if (xx.findIndex((a) => a == crt) < 4) {
          xx = [1, 2, 3, 4, 5, '...', ...[...xx].slice(xx.length - 3, xx.length)];
        } else {
          xx = [1, 2, 3, '...', ...[...xx].slice(xx.length - 5, xx.length)];
        }
      } else {
        xx = [
          1,
          '...',
          ...[...xx].slice(xx.findIndex((a) => a == crt) - 2, xx.findIndex((a) => a == crt) + 3),
          '...',
          xx[xx.length - 1],
        ];
      }
    }
  };
  setPagination();

  return (
    <div className="table-pagination">
      <div
        onClick={() => {
          if (props.page > 1) {
            dispatch(setPage(props.page - 1));
            // props.changePage(props.page - 1);
          }
        }}
        className={`table-pagination-item ${props.page == 1 ? 'disable-item' : ''}`}
      >{`${'<'}`}</div>
      {xx.map((a, i) => {
        return (
          <div
            onClick={() => {
              if (typeof a == 'number') {
                dispatch(setPage(a));
                // props.changePage(a);
              }
            }}
            key={i}
            className={`table-pagination-item  ${a == '...' ? 'et-cetera-item' : ''} ${
              props.page == a ? 'table-pagination-active' : ''
            }`}
          >
            {a}
          </div>
        );
      })}
      <div
        className={`table-pagination-item ${
          props.page == Number((props.total / props.count).toFixed(0)) ? 'disable-item' : ''
        }`}
        onClick={() => {
          if (props.page < Number((props.total / props.count).toFixed(0))) {
            dispatch(setPage(props.page + 1));
            // props.changePage(props.page + 1);
          }
        }}
      >{`${'>'}`}</div>
    </div>
  );
};

export default TablePagination;
