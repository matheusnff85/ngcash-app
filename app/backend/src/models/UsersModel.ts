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

  public async create(newUser: IUser): Promise<IUser> {
    const result = await this._usersModel.create(newUser);
    return result;
  }

  public async update(newInfos: IUser): Promise<any> {
    const { username, password, id } = newInfos;
    const result = await this._usersModel.update(
      { username, password },
      { where: { id } },
    );
    return result;
  }
}
