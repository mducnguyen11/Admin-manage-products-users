import { AuthState } from 'modules/auth/redux/authReducer';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPhotos, IPhoto } from '../../../models//photo';
import { iFilter, iSort, Transaction } from 'models/transactions';

export interface TransactionsState {
  payrollsList: Transaction[];
  page: number;
  filter: iFilter;
  sort: iSort;
}

export const setPayrollsList = createCustomAction('photo/setPayrollsList', (data: Transaction[]) => ({
  data,
}));
export const setPage = createCustomAction('photo/setPage', (data: number) => ({
  data,
}));
export const setFilter = createCustomAction('photo/setFilter', (data: iFilter) => ({
  data,
}));
export const setSort = createCustomAction('photo/setSort', (data: iSort) => ({
  data,
}));

const actions = { setPayrollsList, setFilter, setSort, setPage };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: TransactionsState = {
    payrollsList: [],
    page: 1,
    filter: {
      status: '',
      from: '',
      to: '',
      invoice: '',
    },
    sort: {},
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setPayrollsList):
      return {
        ...state,
        payrollsList: [...action.data],
      };
    case getType(setFilter):
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.data,
        },
      };
    case getType(setSort):
      return {
        ...state,
        sort: action.data,
      };
    case getType(setPage):
      return {
        ...state,
        page: action.data,
      };

    default:
      return state;
  }
}
