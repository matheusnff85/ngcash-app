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
    const { balance } = newAccount;
    const result = await this._accountsModel.create({ balance });
    return result;
  }

  public async update(newInfos: IAccount): Promise<number> {
    const { balance, id } = newInfos;
    const result = await this._accountsModel.update(
      { balance },
      { where: { id } },
    );
    return result[0];
  }

  public async updateBalance(newInfos: IAccount): Promise<IAccount> {
    const { balance, id } = newInfos;
    const result = await this._accountsModel.increment('balance', { by: balance, where: { id } });
    return result;
  }
}
