import React from 'react';
import './table-pagination.scss';
interface Props {
  total: number;
  page: number;
  count: number;
  changePage: Function;
}

const TablePagination = (props: Props) => {
  const x = (props.total / props.count).toFixed(0);
  console.log(props.page);
  const xx: any[] = [];
  for (let i = 0; i < Number(x); i++) {
    xx.push(i);
  }

  return (
    <div className="table-pagination">
      <div
        onClick={() => {
          if (props.page > 1) {
            props.changePage(props.page - 1);
          }
        }}
        className={`table-pagination-item ${props.page == 1 ? 'disable-item' : ''}`}
      >{`${'<'}`}</div>
      {xx.map((a, i) => {
        return (
          <div
            onClick={() => {
              props.changePage(i + 1);
            }}
            key={i}
            className={`table-pagination-item ${props.page == i + 1 ? 'table-pagination-active' : ''}`}
          >
            {i + 1}
          </div>
        );
      })}
      <div
        className={`table-pagination-item ${
          props.page == Number((props.total / props.count).toFixed(0)) ? 'disable-item' : ''
        }`}
        onClick={() => {
          if (props.page < Number((props.total / props.count).toFixed(0))) {
            props.changePage(props.page + 1);
          }
        }}
      >{`${'>'}`}</div>
    </div>
  );
};

export default TablePagination;
