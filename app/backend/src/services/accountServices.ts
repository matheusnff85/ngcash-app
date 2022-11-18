import CustomError from '../types/customError';
import StatusCodes from '../types/statusCodes';
import { IAccount } from '../interfaces/AccountInterface';
import AccountsModel from '../models/AccountsModel';

export default class AccountServices {
  constructor(private accountsModel: AccountsModel = new AccountsModel()) {}

  public async findAll(): Promise<IAccount[]> {
    const result = await this.accountsModel.findAll();
    return result;
  }

  public async findOne(id: string): Promise<IAccount> {
    const result = await this.accountsModel.findOne(id);
    if (!result) throw new CustomError(StatusCodes.NOT_FOUND, 'Account not found.');
    return result;
  }

  public async create(newAccount: IAccount): Promise<IAccount> {
    const result = await this.accountsModel.create(newAccount);
    return result;
  }

  public async update(newInfos: IAccount): Promise<string> {
    const result = await this.accountsModel.update(newInfos);
    if (result === 0) throw new CustomError(StatusCodes.NOT_FOUND, 'Account not found.');
    return 'Account updated.';
  }
}
