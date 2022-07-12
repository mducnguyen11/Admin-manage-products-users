import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface CategoriesState {
  categories: {
    id: string;
    name: string;
  }[];
}

export const setCategories = createCustomAction(
  'auth/setCategories',
  (
    data: {
      id: string;
      name: string;
    }[],
  ) => ({
    data,
  }),
);

const actions = { setCategories };
type Action = ActionType<typeof actions>;

export default function reducer(
  state: CategoriesState = {
    categories: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setCategories):
      return { categories: action.data };
    default:
      return state;
  }
}
