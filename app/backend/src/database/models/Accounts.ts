import { DECIMAL, INTEGER, Model } from 'sequelize';
import db from '.';

class Accounts extends Model {
  id!: number;
  balance!: number;
}

Accounts.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  balance: {
    type: DECIMAL,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Accounts',
  timestamps: false,
});

export default Accounts;
