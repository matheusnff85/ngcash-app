import Accounts from '../database/models/Accounts';
import { IAccount } from '../interfaces/AccountInterface';

export default class AccountsModel {
  private _accountsModel = Accounts;

  public async findAll(): Promise<IAccount[]> {
    const result = await this._accountsModel.findAll();
    return result;
  }

  public async findOne(id: string): Promise<IAccount | null> {
    const result = await this._accountsModel.findOne({ where: { id } });
    return result;
  }
}
