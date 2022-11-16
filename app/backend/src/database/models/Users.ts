import { INTEGER, STRING, Model } from 'sequelize';
import Accounts from './Accounts';
import db from '.';

class Users extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  accountId: {
    type: INTEGER,
    allowNull: false,
    field: 'account_id',
  },
}, {
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

Users.belongsTo(Accounts, { foreignKey: 'accountId' });

export default Users;
