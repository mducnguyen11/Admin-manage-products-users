export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginValidation {
  email: string;
  password: string;
}
export interface IRegisterParams {
  email: string;
  password: string;
  name: string;
  gender: string;
  region: number;
  state: number;
  repeatPassword: string;
}
