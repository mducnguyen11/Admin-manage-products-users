export interface IFilterUser {
  address: string;
  count: number;
  country: string;
  date_range: string[];
  date_type: string;
  memberships: string[];
  order_by: string;
  page: number;
  phone: string;
  search: string;
  sort: string;
  state: string;
  status: string[];
  types: string[];
  tz: number;
}
export interface IFilterUserField {
  address?: string;
  count?: number;
  country?: string;
  date_range?: string[];
  date_type?: string;
  memberships?: string[];
  order_by?: string;
  page?: number;
  phone?: string;
  search?: string;
  sort?: string;
  state?: string;
  status?: string[];
  types?: string[];
  tz?: number;
}

export const defaultFilterUserValue = {
  address: '',
  count: 25,
  country: '',
  date_range: [],
  date_type: 'R',
  memberships: [],
  order_by: '',
  page: 1,
  phone: '',
  search: '',
  sort: '',
  state: '',
  status: [],
  types: [],
  tz: 0,
};

export interface IUserDataTableItem {
  access_level: string;
  created: string;
  fistName: string;
  lastName: string;
  last_login: string;
  order: { order_as_buyer: number; order_as_buyer_total: number };
  product: number;
  profile_id: string;
  storeName: any;
  vendor: string;
  vendor_id: string;
  wishlist: string;
  [key: string]: any;
}

export interface IUserDetailData {
  access_level: string;
  companyName: string;
  default_card_id: string;
  earning: number;
  email: string;
  expense: string;
  firstName: string;
  first_login: string;
  forceChangePassword: string;
  income: string;
  joined: string;
  language: string;
  lastName: string;
  last_login: string;
  membership_id: string | null;
  order_as_buyer: number;
  order_as_buyer_total: number;
  paymentRailsId: string;
  paymentRailsType: string;
  pending_membership_id: string | null;
  products_total: string;
  profile_id: string;
  referer: string;
  roles: string[];
  status: string;
  statusComment: string;
  taxExempt: string;
  vendor_id: string;
  password?: string;
  confirm_password?: string;
  [key: string]: any;
}

export interface IUserDataField {
  access_level?: string;
  companyName?: string;
  default_card_id?: string;
  earning?: number;
  email?: string;
  expense?: string;
  firstName?: string;
  first_login?: string;
  forceChangePassword?: string;
  income?: string;
  joined?: string;
  language?: string;
  lastName?: string;
  last_login?: string;
  membership_id?: string | null;
  order_as_buyer?: number;
  order_as_buyer_total?: number;
  paymentRailsId?: string;
  paymentRailsType?: string;
  pending_membership_id?: string | null;
  products_total?: string;
  profile_id?: string;
  referer?: string;
  roles?: string[];
  status?: string;
  statusComment?: string;
  taxExempt?: string;
  vendor_id?: string;
  password?: string;
  confirm_password?: string;
}

export interface IUserDataPayload {
  access_level: string;
  confirm_password: string;
  email: string;
  firstName: string;
  forceChangePassword: number;
  lastName: string;
  membership_id: string;
  password: string;
  paymentRailsType: string;
  taxExempt: number;
  [key: string]: any;
}

export interface INewUserData {
  access_level: string;
  confirm_password: string;
  email: string;
  firstName: string;
  forceChangePassword: number;
  lastName: string;
  membership_id: string;
  password: string;
  paymentRailsType: string;
  taxExempt: number;
}

export interface INewUserDataField {
  access_level?: string;
  confirm_password?: string;
  email?: string;
  firstName?: string;
  forceChangePassword?: number;
  lastName?: string;
  membership_id?: string;
  password?: string;
  paymentRailsType?: string;
  taxExempt?: number;
}
export const DefaultNewUserValue = {
  access_level: '10',
  companyName: '',
  default_card_id: '',
  earning: 0,
  email: '',
  expense: '',
  firstName: '',
  first_login: '',
  forceChangePassword: '',
  income: '',
  joined: '',
  language: '',
  lastName: '',
  last_login: '',
  membership_id: '',
  order_as_buyer: 0,
  order_as_buyer_total: 0,
  paymentRailsId: '',
  paymentRailsType: 'individual',
  pending_membership_id: '',
  products_total: '',
  profile_id: '',
  referer: '',
  roles: [],
  status: '',
  statusComment: '',
  taxExempt: '',
  vendor_id: '',
  password: '',
  confirm_password: '',
};

export interface AuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface IUserLogin {
  profile_id: string;
  login: string;
  firstName: string;
  lastName: string;
  dateOfLoginAttempt: string;
  countOfLoginAttempts: string;
  forceChangePassword: string;
}
