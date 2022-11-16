import Users from '../database/models/Users';
import { IUser } from '../interfaces/UserInterface';

export default class UsersModel {
  private _usersModel = Users;

  public async findAll(): Promise<IUser[]> {
    const result = await this._usersModel.findAll();
    return result;
  }

  public async findOne(id: string): Promise<IUser | null> {
    const result = await this._usersModel.findOne({ where: { id } });
    return result;
  }
}
