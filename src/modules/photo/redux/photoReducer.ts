import { AuthState } from 'modules/auth/redux/authReducer';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPhotos, IPhoto } from '../../../models//photo';

export interface PhotoState {
  listPhotos?: IPhoto[];
  compare?: number;
  isLoading?: boolean;
}

export const setListPhotos = createCustomAction('photo/setPhotos', (data: IPhoto[]) => ({
  data,
}));
export const setMoreCompare = createCustomAction('photo/setCompare');
export const setPhotosLoading = createCustomAction('photo/setPhotosLoading');
export const stopPhotosLoading = createCustomAction('photo/stopPhotosLoading');

const actions = { setListPhotos, stopPhotosLoading, setPhotosLoading, setMoreCompare };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: PhotoState = {
    compare: 11,
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setListPhotos):
      return {
        ...state,
        listPhotos: action.data,
        isLoading: false,
      };
    // case getType(setUserInfo):
    //   return { ...state, user: action.data };
    case getType(setMoreCompare):
      return {
        ...state,
        compare: state?.compare ? state?.compare + 5 : 5,
      };
    case getType(setPhotosLoading):
      return {
        ...state,
        isLoading: true,
      };
    case getType(stopPhotosLoading):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
