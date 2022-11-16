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

  public async create(newAccount: IAccount): Promise<IAccount> {
    const result = await this._accountsModel.create(newAccount);
    return result;
  }

  public async update(newInfos: IAccount): Promise<any> {
    const { balance, id } = newInfos;
    const result = await this._accountsModel.update(
      { balance },
      { where: { id } },
    );
    return result;
  }
}
