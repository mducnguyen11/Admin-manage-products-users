import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface AdminLoadingState {
  isLoading: boolean;
}

export const setLoading = createCustomAction('auth/setLoading', () => {});
export const stopLoading = createCustomAction('auth/stopLoading', () => {});
const actions = { setLoading, stopLoading };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: AdminLoadingState = {
    isLoading: false,
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setLoading):
      return { isLoading: true };
    case getType(stopLoading):
      return { isLoading: false };
    default:
      return state;
  }
}
