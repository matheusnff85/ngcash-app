import { RequestHandler } from 'express';
import { IAccount } from '../interfaces/AccountInterface';
import AccountServices from '../services/accountServices';
import StatusCodes from '../types/statusCodes';

export default class AccountController {
  constructor(private accountServices: AccountServices = new AccountServices()) {}

  public findAll: RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.accountServices.findAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findOne: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.accountServices.findOne(req.params.id);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.accountServices.create(req.body);
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  public update: RequestHandler = async (req, res, next) => {
    try {
      const accountObj: IAccount = req.body;
      accountObj.id = Number(req.params.id);
      const result = await this.accountServices.update(accountObj);
      return res.status(StatusCodes.OK).json({ message: result });
    } catch (error) {
      next(error);
    }
  };
}
