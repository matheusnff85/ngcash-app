import Transactions from '../database/models/Transactions';
import { ITransaction } from '../interfaces/TransactionInterface';

export default class TransactionsModel {
  private _transactionsModel = Transactions;

  public async findAll(): Promise<ITransaction[]> {
    const result = await this._transactionsModel.findAll();
    return result;
  }

  public async findOne(id: string): Promise<ITransaction | null> {
    const result = await this._transactionsModel.findOne({ where: { id } });
    return result;
  }

  public async create(newTransaction: ITransaction): Promise<ITransaction> {
    const result = await this._transactionsModel.create(newTransaction);
    return result;
  }

  public async update(newInfos: ITransaction): Promise<number> {
    const { debitedAccountId, creditedAccountId, value, id } = newInfos;
    const result = await this._transactionsModel.update(
      { debitedAccountId, creditedAccountId, value },
      { where: { id } },
    );
    return result[0];
  }
}
