import { Transaction } from 'models/transactions';
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
