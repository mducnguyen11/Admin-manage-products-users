import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface ShippingsState {
  shippings: {
    id: string | null;
    name: string;
    [key: string]: any;
  }[];
}

export const setShippings = createCustomAction(
  'auth/setShippings',
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

const actions = { setShippings };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: ShippingsState = {
    shippings: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setShippings):
      return { shippings: action.data };
    default:
      return state;
  }
}
