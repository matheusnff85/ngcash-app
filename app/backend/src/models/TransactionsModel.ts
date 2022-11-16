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
}
