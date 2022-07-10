import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { AuthToken, IUser } from '../../../models/user';

export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}

export const setAuthorization = createCustomAction('auth/setAuthorization', (data: AuthToken) => ({
  data,
}));

export const setUserInfo = createCustomAction('auth/setUserInfo', (data: IUser) => ({
  data,
}));
export const logout = createCustomAction('auth/logout');
export const removeUserInfo = createCustomAction('auth/removeUserInfo');

const actions = { logout, setAuthorization, removeUserInfo, setUserInfo };

type Action = ActionType<typeof actions>;

export default function reducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(removeUserInfo): {
      return { ...state, user: null };
    }
    case getType(logout): {
      return { ...state, auth: null, user: null };
    }
    default:
      return state;
  }
}
