import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface VendorsState {
  vendors: {
    id: string;
    name: string;
    [key: string]: any;
  }[];
}

export const setVendors = createCustomAction(
  'auth/setVendors',
  (
    data: {
      id: string;
      name: string;
      [key: string]: any;
    }[],
  ) => ({
    data,
  }),
);

const actions = { setVendors };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: VendorsState = {
    vendors: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setVendors):
      return { vendors: action.data };
    default:
      return state;
  }
}
