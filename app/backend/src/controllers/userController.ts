import { RequestHandler } from 'express';
import UserServices from '../services/userServices';
import { IUser } from '../interfaces/UserInterface';
import StatusCodes from '../types/statusCodes';

export default class UserController {
  constructor(private userServices: UserServices = new UserServices()) {}

  public findAll: RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.userServices.findAll();
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findOne: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.userServices.findOne(req.params.id);
      return result;
    } catch (error) {
      next(error);
    }
  };

  public login: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.userServices.login(req.body);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    try {
      const result = await this.userServices.create(req.body);
      return res.status(StatusCodes.CREATED).json(result);
    } catch (error) {
      next(error);
    }
  };

  public update: RequestHandler = async (req, res, next) => {
    try {
      const userObj: IUser = req.body;
      userObj.id = Number(req.params.id);
      const result = await this.userServices.update(userObj);
      return res.status(StatusCodes.OK).json({ message: result });
    } catch (error) {
      next(error);
    }
  };
}
