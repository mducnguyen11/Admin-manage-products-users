import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from 'utils/constants';
import axios from 'axios';

export const AxiosFormDataConfig = axios.create({
  headers: {
    'content-type': 'multipart/form-data',
    Authorization: Cookies.get(ACCESS_TOKEN_KEY) || '',
  },
});
