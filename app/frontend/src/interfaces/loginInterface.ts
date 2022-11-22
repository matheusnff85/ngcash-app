export interface ILogin {
  username: string,
  password: string,
}

export interface IUserLoginInfos {
  id: number,
  username: string,
  password: string,
  token: string,
  accountId: number,
  userBalance: {
    balance: number,
  }
}