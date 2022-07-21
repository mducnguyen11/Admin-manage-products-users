import { IUserDataField, IUserDataPayload, IUserDetailData } from 'models/user';
import { validEmailRegex } from 'utils';

export const formatToUserPayloadCreate = (a: IUserDetailData): IUserDataPayload => {
  const xx = {
    access_level: a.access_level,
    confirm_password: a.confirm_password || '',
    email: a.email,
    firstName: a.firstName,
    forceChangePassword: Number(a.forceChangePassword),
    lastName: a.lastName,
    membership_id: a.membership_id || '',
    password: a.password || '',
    paymentRailsType: a.paymentRailsType,
    taxExempt: Number(a.taxExempt),
  };
  return xx;
};
export const formartUserToPayload = (a: IUserDetailData): IUserDataPayload => {
  const setPassword = (password: string | undefined): string => {
    if (password) {
      return password;
    } else {
      return '';
    }
  };
  const xx = {
    ...a,
    forceChangePassword: Number(a.forceChangePassword),
    roles: [
      ...a.roles.map((b) => {
        return Number(b);
      }),
    ],
    taxExempt: Number(a.taxExempt),
    id: a.profile_id,
    confirm_password: setPassword(a.confirm_password),
    password: setPassword(a.password),
    membership_id: a.membership_id || '',
  };
  return xx;
};

export const validateUserData = (a: IUserDataField, listFieldRequired: string[]) => {
  const tt: { [key: string]: string } = {};
  [...Object.keys(a)].forEach((b) => {
    if (listFieldRequired.findIndex((t) => t == b) >= 0) {
      if (b == 'confirm_password') {
        if (a[b as keyof typeof a] !== a.password) {
          tt[b] = 'confirmPasswordNotMatch';
        }
      }
      if (!a[b as keyof typeof a]) {
        tt[b] = 'requiredField';
      }
    }
  });
  if (a.email) {
    console.log('email :', a.email);
    if (!validEmailRegex.test(a.email)) {
      tt.email = 'emailInvalid';
    }
  }
  return {
    validate: Object.keys(tt).length == 0,
    errors: tt,
  };
};

export const validateUserDataToUpdate = (a: IUserDataField) => {
  const listFieldRequired = ['email', 'status'];
  return validateUserData(a, listFieldRequired);
};

export const validateUserDataToCreate = (a: IUserDataField) => {
  const listFieldRequired = [
    'firstName',
    'lastName',
    'paymentRailsType',
    'email',
    'access_level',
    'password',
    'confirm_password',
  ];
  return validateUserData(a, listFieldRequired);
};
