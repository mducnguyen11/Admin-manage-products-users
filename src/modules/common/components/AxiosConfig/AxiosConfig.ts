import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from 'utils/constants';

export const AxiosFormDataConfig = {
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
  },
};
