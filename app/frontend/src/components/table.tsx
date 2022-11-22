import React from 'react';
import { ITransaction } from '../interfaces/transactionInterface';

export default class Table extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      transactionsFilter: [],
    }
  }

  orderByReleaseDate = (type: string) => {
    const { transactions } = this.props;
    const { transactionsFilter } = this.state;

    if (type === 'DSC') {
      const filtered = (transactionsFilter.length > 0 ? transactionsFilter : transactions)
        .sort((a: ITransaction, b: ITransaction) => {
          const dateOne = new Date(a.createdAt) as any;
          const dateTwo = new Date(b.createdAt) as any;
          return dateTwo - dateOne;
        });
      this.setState({ transactionsFilter: filtered });
    }
    if (type === 'ASC') {
      const filtered = (transactionsFilter.length > 0 ? transactionsFilter : transactions)
        .sort((a: ITransaction, b: ITransaction) => {
          const dateOne = new Date(a.createdAt) as any;
          const dateTwo = new Date(b.createdAt) as any;
          return dateOne - dateTwo;
        });
      this.setState({ transactionsFilter: filtered });
    }
  };

  filterByDate = (date: string) => {
    const { transactions } = this.props;
    const { transactionsFilter } = this.state;
    const filtered = (transactionsFilter.length > 0 ? transactionsFilter : transactions)
      .filter((item: ITransaction) => {
        const convertItemDate = new Date(item.createdAt).toLocaleDateString();
        const convertFilterDate = new Date(`${date} 00:00:00`).toLocaleDateString();
        return convertItemDate === convertFilterDate;
      });
    this.setState({ transactionsFilter: filtered });
  }

  filterByType = (type: string) => {
    const { userId, transactions } = this.props;
    if(type === 'cashIn') {
      const filtered = transactions.filter((item: ITransaction) => item.creditedAccountId === userId);
      this.setState({ transactionsFilter: filtered });
    } 
    if (type === 'cashOut') {
      const filtered = transactions.filter((item: ITransaction) => item.debitedAccountId === userId);
      this.setState({ transactionsFilter: filtered });
    }
    if (type === 'all') {
      this.setState({ transactionsFilter: transactions });
    }
  };

  render(): React.ReactNode {
    const { transactionsFilter } = this.state;
    const { transactions, userId } = this.props;
    return (
      <div>
        <div>
          <select 
            name="transactionType" 
            id="transactionType" 
            onChange={ ({ target }) => this.filterByType(target.value)}
          >
            <option value="all" defaultChecked >Todas</option>
            <option value="cashIn" >Cash-In</option>
            <option value="cashOut" >Cash-Out</option>
          </select>
          <button onClick={ () => this.orderByReleaseDate('DSC') }>Recentes</button>
          <button onClick={ () => this.orderByReleaseDate('ASC') }>Antigas</button>
          <input type="date" name="filterDate" id="filterDate" onChange={ ({ target }) => this.filterByDate(target.value) } />
        </div>
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
            { (transactionsFilter.length > 0 ? transactionsFilter : transactions).map((item: ITransaction, index: number) => (
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
