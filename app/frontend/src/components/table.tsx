import React from 'react';
import { ITransaction } from '../interfaces/transactionInterface';

export default class Table extends React.Component<any, any> {
  render(): React.ReactNode {
    const { transactions, userId } = this.props;
    // console.log(transactions, userId);
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Data</th>
            </tr>
          </thead>

          <tbody>
            { transactions && transactions.map((item: ITransaction, index: number) => (
              <tr key={ index }>
                <td>{ item?.id }</td>
                <td>{ item.debitedAccountId === userId ? 'Cash-Out' : 'Cash-In' }</td>
                <td>{ `R$${item.value}` }</td>
                <td>{ new Date(item.createdAt).toLocaleString() }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
