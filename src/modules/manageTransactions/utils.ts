import { iFilter, Transaction } from 'models/transactions';
import moment from 'moment';

export const STATUS_NAME = {
  RECEIVED: 'Received',
  PROCESSING: 'Processing',
  FULFILLED: 'Fulfilled',
  CANCELLED: 'Cancelled',
  SPENDING: 'Spending',
};

export const formatStatus = (item: Transaction) => {
  if (item.received) {
    return STATUS_NAME.RECEIVED;
  }
  if (item.approved || item.matched) {
    return STATUS_NAME.PROCESSING;
  }
  if (item.fulfilled) {
    return STATUS_NAME.FULFILLED;
  }
  if (item.canceled) {
    return STATUS_NAME.CANCELLED;
  }

  return STATUS_NAME.SPENDING;
};

export const formatDate = (x: string) => {
  const xx = moment().format(x);
  return moment(xx).format('ll');
};

export const filterTransactions = (data: Transaction[], a: iFilter): Transaction[] => {
  let xx = [...data];
  if (a.status == '' && a.from == '' && a.invoice == '' && a.to == '') {
    return data;
  }

  if (a.status) {
    xx = xx.filter((ax) => {
      return formatStatus(ax) == a.status;
    });
  }
  if (a.invoice) {
    console.log('invoice :  ', a.invoice);
    console.log('xx first :', xx[0].payroll_id);
    console.log(xx[0].payroll_id.includes(a.invoice));
    xx = xx.filter((ax) => {
      if (ax.payroll_id.includes(a.invoice.trim())) {
        return ax;
      }
    });
  }
  if (a.from) {
    xx = xx.filter((ax) => {
      if (moment(formatDate(ax.date_confirmed)).isAfter(a.from)) {
        return ax;
      }
    });
  }
  if (a.to) {
    xx = xx.filter((ax) => {
      if (!moment(formatDate(ax.date_confirmed)).isAfter(a.to)) {
        return ax;
      }
    });
  }
  return xx;
};
export const sortTransactions = (
  dataCurrent: Transaction[],
  objsort: { date?: string; total?: string },
): Transaction[] => {
  if (objsort.date) {
    switch (objsort.date) {
      case 'increase':
        console.log('mathch date ins ');
        return [
          ...[...dataCurrent].sort((a, b) => {
            if (moment(formatDate(a.date_confirmed)).isAfter(formatDate(b.date_confirmed))) {
              return 1;
            } else {
              return -1;
            }
          }),
        ];

      case 'decrease':
        console.log('mathch date des ');
        return [
          ...[...dataCurrent].sort((a, b) => {
            if (moment(formatDate(a.date_confirmed)).isAfter(formatDate(b.date_confirmed))) {
              return -1;
            } else {
              return 1;
            }
          }),
        ];

      default:
        return dataCurrent;
    }
  } else {
    if (objsort.total) {
      console.log('mathch total ');
      switch (objsort.total) {
        case 'increase':
          console.log([...dataCurrent][0]);
          return [
            ...[...dataCurrent].sort((a, b) => {
              if (a.volume_input_in_input_currency > b.volume_input_in_input_currency) {
                return 1;
              } else {
                return -1;
              }
            }),
          ];

        case 'decrease':
          return [
            ...[...dataCurrent].sort((a, b) => {
              if (a.volume_input_in_input_currency > b.volume_input_in_input_currency) {
                return -1;
              } else {
                return 1;
              }
            }),
          ];

        default:
          return dataCurrent;
      }
    } else {
      return dataCurrent;
    }
  }
};

export const setDatatoRender = (dataCurrent: Transaction[], page: number): Transaction[] => {
  let newarr = [];
  if (page * 5 <= dataCurrent.length - 1) {
    console.log('vclll 11111111111111111ae', dataCurrent.length, page);
    newarr = dataCurrent.slice((page - 1) * 5, page * 5);
  } else {
    console.log('vclll ae', dataCurrent.length, page);
    newarr = dataCurrent.slice((page - 1) * 5, dataCurrent.length);
  }
  return newarr;
};
