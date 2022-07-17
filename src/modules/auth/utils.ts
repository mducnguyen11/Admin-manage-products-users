import { ILoginParams, ILoginValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';
import * as Yup from 'yup';
const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

export const yupValidateLogin = Yup.object({
  password: Yup.string().required('passwordRequire').min(4, 'minPasswordInvalid'),
  email: Yup.string().required('emailRequire').email('emailInvalid'),
});
export const yupValidateRegister = Yup.object({
  password: Yup.string().required('passwordRequire').min(4, 'minPasswordInvalid'),
  email: Yup.string().required('emailRequire').email('emailInvalid'),
  name: Yup.string().required('fullNameRequire'),
  repeatPassword: Yup.string()
    .required('confirmPasswordRequire')
    .when('password', (password, field) =>
      password
        ? field.required('confirmPasswordRequire').oneOf([Yup.ref('password'), null], 'confirmPasswordInvalid')
        : field,
    ),
  gender: Yup.string().required('genderRequire'),
  region: Yup.number().min(1, 'locationCountryRequire'),
  state: Yup.number().min(1, 'locationCityRequire'),
});
