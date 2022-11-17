import { INTEGER, DECIMAL, DATE, Model } from 'sequelize';
import Accounts from './Accounts';
import db from '.';

class Transactions extends Model {
  id!: number;
  debitedAccountId!: number;
  creditedAccountId!: number;
  value!: number;
  createdAt!: Date;
}

Transactions.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false,
    field: 'debited_account_id',
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull: false,
    field: 'credited_account_id',
  },
  value: {
    type: DECIMAL,
    allowNull: false,
  },
  createdAt: {
    type: DATE,
    allowNull: false,
    field: 'created_at',
  },
}, {
  sequelize: db,
  modelName: 'Transactions',
  timestamps: false,
});

Transactions.belongsTo(Accounts, { foreignKey: 'debitedAccountId' });
Transactions.belongsTo(Accounts, { foreignKey: 'creditedAccountId' });

export default Transactions;
