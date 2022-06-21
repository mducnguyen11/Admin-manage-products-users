import { AuthState } from 'modules/auth/redux/authReducer';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPhotos, IPhoto } from '../../../models//photo';
import { Transaction } from 'models/transactions';

export interface TransactionsState {
  payrollsList: Transaction[];
  page: number;
}

export const setPayrollsList = createCustomAction('photo/setPayrollsList', (data: Transaction[]) => ({
  data,
}));
export const setPage = createCustomAction('photo/setPage', (data: number) => ({
  data,
}));

const actions = { setPayrollsList, setPage };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: TransactionsState = {
    payrollsList: [],
    page: 1,
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setPayrollsList):
      return {
        ...state,
        payrollsList: [...action.data],
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
