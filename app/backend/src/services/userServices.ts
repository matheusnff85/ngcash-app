import CustomError from '../types/customError';
import StatusCodes from '../types/statusCodes';
import { IUser } from '../interfaces/UserInterface';
import UsersModel from '../models/UsersModel';
import { userSchema, validateNewUser } from '../validations/userValidation';

export default class UserServices {
  constructor(private usersModel: UsersModel = new UsersModel()) {}

  public async findAll(): Promise<IUser[]> {
    const result = await this.usersModel.findAll();
    return result;
  }

  public async findOne(id: string): Promise<IUser> {
    const result = await this.usersModel.findOne(id);
    if (!result) throw new CustomError(StatusCodes.NOT_FOUND, 'User not found.');
    return result;
  }

  public async create(newUser: IUser): Promise<IUser> {
    await validateNewUser(newUser);
    const result = await this.usersModel.create(newUser);
    return result;
  }

  public async update(newInfos: IUser): Promise<any> {
    const { error } = userSchema.validate(newInfos);
    if (error) throw new CustomError(StatusCodes.BAD_REQUEST, error.message);
    const result = await this.update(newInfos);
    return result;
  }
}
