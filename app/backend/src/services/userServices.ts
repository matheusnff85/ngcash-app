import * as bcrypt from 'bcryptjs';
import CustomError from '../types/customError';
import StatusCodes from '../types/statusCodes';
import { IUser } from '../interfaces/UserInterface';
import UsersModel from '../models/UsersModel';
import { userSchema, validateNewUser } from '../validations/userValidation';
import generateToken from '../utils/generateToken';

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

  public async login(loginObj: IUser): Promise<string> {
    const { username, password } = loginObj;
    const result = await this.usersModel.findByUsername(username);
    if (!result) throw new CustomError(StatusCodes.UNAUTHORIZED, 'incorrect username');
    const validatePass = await bcrypt.compare(password, result.password);
    if (!validatePass) throw new CustomError(StatusCodes.UNAUTHORIZED, 'incorrect password');
    const token = generateToken(username);
    return token;
  }

  public async create(newUser: IUser): Promise<IUser> {
    await validateNewUser(newUser);
    const result = await this.usersModel.create(newUser);
    return result;
  }

  public async update(newInfos: IUser): Promise<string> {
    const { error } = userSchema.validate(newInfos);
    if (error) throw new CustomError(StatusCodes.BAD_REQUEST, error.message);
    const result = await this.usersModel.update(newInfos);
    if (result[0] === 0) throw new CustomError(StatusCodes.NOT_FOUND, 'User not found.');
    return 'User updated.';
  }
}
