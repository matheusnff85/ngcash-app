import CustomError from '../types/customError';
import StatusCodes from '../types/statusCodes';
import { ITransaction } from '../interfaces/TransactionInterface';
import TransactionsModel from '../models/TransactionsModel';
import validateTransaction from '../validations/transactionValidation';

export default class TransactionServices {
  constructor(private transactionModel: TransactionsModel = new TransactionsModel()) {}

  public async findAll(): Promise<ITransaction[]> {
    const result = await this.transactionModel.findAll();
    return result;
  }

  public async findOne(id: string): Promise<ITransaction> {
    const result = await this.transactionModel.findOne(id);
    if (!result) throw new CustomError(StatusCodes.NOT_FOUND, 'Transaction not found.');
    return result;
  }

  public async create(newTransaction: ITransaction): Promise<ITransaction> {
    await validateTransaction(newTransaction);
    const result = await this.transactionModel.create(newTransaction);
    return result;
  }

  public async update(newInfos: ITransaction): Promise<string> {
    const result = await this.transactionModel.update(newInfos);
    if (result === 0) throw new CustomError(StatusCodes.NOT_FOUND, 'Transaction not found.');
    return 'Transaction updated.';
  }
}
