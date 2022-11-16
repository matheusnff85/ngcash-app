import * as Joi from 'joi';
import { ITransaction } from '../interfaces/TransactionInterface';
import CustomError from '../types/customError';
import StatusCodes from '../types/statusCodes';
import AccountsModel from '../models/AccountsModel';

const transactionSchema = Joi.object({
  debitedAccountId: Joi.number().integer().required(),
  creditedAccountId: Joi.number().integer().required(),
  value: Joi.number().required(),
});

const accountsModel = new AccountsModel();

const validateTransaction = async (newTransaction: ITransaction): Promise<void> => {
  const { debitedAccountId, creditedAccountId } = newTransaction;
  if (debitedAccountId === creditedAccountId) {
    throw new CustomError(StatusCodes.UNAUTHORIZED, 'Cannot make a transaction to yourself.');
  }

  const { error } = transactionSchema.validate(newTransaction);
  if (error) throw new CustomError(StatusCodes.BAD_REQUEST, 'All fields must be filled.');

  const debitedAccount = await accountsModel.findOne(`${debitedAccountId}`);
  const creditedAccount = await accountsModel.findOne(`${creditedAccountId}`);

  if (!debitedAccount || !creditedAccount) {
    throw new CustomError(StatusCodes.NOT_FOUND, 'There is no account with such id.');
  }
};

export default validateTransaction;
