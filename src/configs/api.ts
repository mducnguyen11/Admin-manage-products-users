import { APIHost } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/auth`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  register: `http://api.training.div3.pgtest.co/api/v1/auth/register`,
  regionList: 'http://api.training.div3.pgtest.co/api/v1/location',
  photoList: 'https://jsonplaceholder.typicode.com/photos',
  transactionsData: 'https://62ae9c32645d00a28a0a6840.mockapi.io/payrolllist',
};
