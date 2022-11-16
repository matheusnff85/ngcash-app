export interface IUser {
  id?: number;
  username: string;
  password: string;
  accountId?: number;
  token?: string;
}

export interface ILogin {
  id?: number;
  username: string;
  accountId?: number;
  token: string;
}
