import { APIHost, BASE_API, APIAdmin, APIVendor } from '../utils/constants';

enum APIService {
  auth,
  protected,
  public,
  admin,
  vendor,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${BASE_API}${APIHost}/authentication`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${BASE_API}${APIHost}`;
  } else if (service === APIService.admin) {
    return `${BASE_API}${APIAdmin}`;
  } else if (service === APIService.vendor) {
    return `${BASE_API}${APIVendor}`;
  }
  {
    return '';
  }
}

export const API_PATHS = {
  register: `http://api.training.div3.pgtest.co/api/v1/auth/register`,
  regionList: 'http://api.training.div3.pgtest.co/api/v1/location',
  photoList: 'https://jsonplaceholder.typicode.com/photos',
  transactionsData: 'https://62ae9c32645d00a28a0a6840.mockapi.io/payrolllist',

  signIn: `${getBaseUrl(APIService.auth)}/login`,
  getCategoriesList: `${getBaseUrl(APIService.public)}/categories/list`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  getProductsList: `${getBaseUrl(APIService.public)}/products/list`,
  headerNotification: `${getBaseUrl(APIService.admin)}/commons/header.notifications`,
  deleteProductsbyIDArray: `${getBaseUrl(APIService.admin)}/products/edit`,
  saveEditProducts: `${getBaseUrl(APIService.admin)}/products/edit`,
  getProductDetail: `${getBaseUrl(APIService.admin)}/products/detail`,
  createNewProduct: `${getBaseUrl(APIService.admin)}/products/create`,
  saveProduct: `${getBaseUrl(APIService.admin)}/products/create`,
  uploadProductImage: `${getBaseUrl(APIService.public)}/products/upload-image`,

  getVendorsList: `${getBaseUrl(APIService.admin)}/vendors/list`,
  getBrandsList: `${getBaseUrl(APIService.admin)}/brands/list`,
  getCommonRole: `${getBaseUrl(APIService.admin)}/commons/role`,
  getCommonCountry: `${getBaseUrl(APIService.admin)}/commons/country`,
  getUserList: `${getBaseUrl(APIService.admin)}/users/list`,
  getProfileDetail: `${getBaseUrl(APIService.vendor)}/profile/detail  `,
  userEdit: `${getBaseUrl(APIService.admin)}/users/edit`,
  createNewUser: `${getBaseUrl(APIService.admin)}/users/create`,
  deleteUserByIDArray: `${getBaseUrl(APIService.admin)}/users/edit`,
  getUserDetail: `${getBaseUrl(APIService.vendor)}/profile/detail`,
};
