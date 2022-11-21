import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';
import AccountsModel from './AccountsModel';
import { IUser } from '../interfaces/UserInterface';
import Accounts from '../database/models/Accounts';

const accountsModel = new AccountsModel();

export default class UsersModel {
  private _usersModel = Users;

  public async findAll(): Promise<IUser[]> {
    const result = await this._usersModel.findAll({
      include: [
        { model: Accounts, as: 'userBalance', attributes: ['balance'] },
      ],
      attributes: { exclude: ['password'] },
    });
    return result;
  }

  public async findOne(id: string): Promise<IUser | null> {
    const result = await this._usersModel.findOne({
      include: [
        { model: Accounts, as: 'userBalance', attributes: ['balance'] },
      ],
      attributes: { exclude: ['password'] },
      where: { id },
    });
    return result;
  }

  public async findByUsername(username: string): Promise<IUser | null> {
    const result = await this._usersModel.findOne({
      where: { username },
      include: [
        { model: Accounts, as: 'userBalance', attributes: ['balance'] },
      ],
    });
    return result;
  }

  public async create(newUser: IUser): Promise<IUser> {
    const hashedPass = await bcrypt.hash(newUser.password, 10);
    const { id } = await accountsModel.create({ balance: 100 });
    const newUserObj = { username: newUser.username, accountId: id, password: hashedPass };
    const result = await this._usersModel.create(newUserObj);
    return result;
  }

  public async update(newInfos: IUser): Promise<number> {
    const hashedPass = await bcrypt.hash(newInfos.password, 10);
    const { username, id } = newInfos;
    const result = await this._usersModel.update(
      { username, password: hashedPass },
      { where: { id } },
    );
    return result[0];
  }
}
