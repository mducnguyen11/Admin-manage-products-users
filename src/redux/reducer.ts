import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import photoReducer, { PhotoState } from '../modules/photo/redux/photoReducer';
import transactionsReducer, { TransactionsState } from 'modules/manageTransactions/redux/transactions';
import loadingReducer, { AdminLoadingState } from '../modules/admin/redux/loadingReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  photos: PhotoState;
  transactions: TransactionsState;
  loading: AdminLoadingState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    photos: photoReducer,
    transactions: transactionsReducer,
    loading: loadingReducer,
  });
}
