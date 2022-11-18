import { RequestHandler } from 'express';
import { ITransaction } from '../interfaces/TransactionInterface';
import TransactionServices from '../services/transactionServices';
import StatusCodes from '../types/statusCodes';

export default class TransactionController {
  constructor(private transactionServices: TransactionServices = new TransactionServices()) {}

  public findAll: RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.transactionServices.findAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findOne: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.transactionServices.findOne(req.params.id);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.transactionServices.create(req.body);
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  public update: RequestHandler = async (req, res, next) => {
    try {
      const transactionObj: ITransaction = req.body;
      transactionObj.id = Number(req.params.id);
      const result = await this.transactionServices.update(transactionObj);
      return res.status(StatusCodes.OK).json({ message: result });
    } catch (error) {
      next(error);
    }
  };

  public findUserTransactions: RequestHandler = async (req, res, next) => {
    try {
      console.log(req.params);
      const result = await this.transactionServices.findUserTransactions(req.params.id);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}
