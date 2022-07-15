import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface CountryState {
  country: {
    code: string;
    currency_id: string;
    id: string;
    code3: string;
    enabled: string;
    active_currency: any;
    is_fraudlent: string;
    country: string;
  }[];
}

export const setCountry = createCustomAction(
  'auth/setCountry',
  (
    data: {
      code: string;
      currency_id: string;
      id: string;
      code3: string;
      enabled: string;
      active_currency: any;
      is_fraudlent: string;
      country: string;
    }[],
  ) => ({
    data,
  }),
);

const actions = { setCountry };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: CountryState = {
    country: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setCountry):
      return { country: action.data };
    default:
      return state;
  }
}
