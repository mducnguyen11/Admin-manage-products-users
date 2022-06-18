import { AuthState } from 'modules/auth/redux/authReducer';
import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { IPhotos, IPhoto } from '../../../models//photo';

export interface PhotoState {
  listPhotos: IPhoto[];
  recentListPhotos: IPhoto[];
}

export const setListPhotos = createCustomAction('photo/setPhotos', (data: IPhoto[]) => ({
  data,
}));
export const setMoreCompare = createCustomAction('photo/setCompare');
export const comfirmListPhotos = createCustomAction('photo/comfirmListPhotos');
export const resetListPhotos = createCustomAction('photo/resetListPhotos');
export const setMorePhotos = createCustomAction('photo/setMorePhotos', (data: IPhoto[]) => ({
  data,
}));
export const changePhoto = createCustomAction('photo/changePhoto', (data: IPhoto) => ({
  data,
}));

const actions = { changePhoto, setListPhotos, setMorePhotos, comfirmListPhotos, resetListPhotos, setMoreCompare };

type Action = ActionType<typeof actions>;

export default function reducer(
  state: PhotoState = {
    listPhotos: [],
    recentListPhotos: [],
  },
  action: Action,
) {
  switch (action.type) {
    case getType(setListPhotos):
      return {
        ...state,
        listPhotos: [...action.data],
        recentListPhotos: [...action.data],
        isLoading: false,
      };
    case getType(comfirmListPhotos):
      return {
        ...state,
        recentListPhotos: [...state.listPhotos],
      };
    case getType(resetListPhotos):
      return {
        ...state,
        listPhotos: [...state.recentListPhotos],
      };
    case getType(changePhoto): {
      state.listPhotos[state.listPhotos.findIndex((a) => a.id == action.data.id)] = action.data;
      return {
        ...state,
        isLoading: false,
      };
    }

    // case getType(setUserInfo):
    //   return { ...state, user: action.data };
    case getType(setMorePhotos):
      return {
        ...state,
        listPhotos: [...state.listPhotos, ...action.data],
        isLoading: false,
        recentListPhotos: [...state.recentListPhotos, ...action.data],
      };

    default:
      return state;
  }
}
