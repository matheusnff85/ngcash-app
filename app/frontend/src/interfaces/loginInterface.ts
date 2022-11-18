export interface ILogin {
  username: string,
  password: string,
}

export interface IUserLoginInfos {
  username: string,
  password: string,
  token: string,
  accountId: number,
  accountBalance: {
    balance: number,
  }
}