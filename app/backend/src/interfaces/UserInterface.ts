export interface IUser {
  id?: number;
  username: string;
  password: string;
  accountId?: number;
  token?: string;
  userBalance?: {
    balance: number,
  }
}

export interface ILogin {
  id?: number;
  username: string;
  accountId?: number;
  token: string;
  userBalance?: {
    balance: number,
  }
}
